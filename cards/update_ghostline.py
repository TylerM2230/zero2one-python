
import os
import re

cards_dir = '/home/kyotsketeh/python-zero2one/cards'

nav_template = """        <div class="bottom-nav">
            <div class="nav-links">
                <button class="hc-button" onclick="window.location.href='../browse.html'">
                    [ BROWSE ]
                </button>
                <button class="hc-button" onclick="window.location.href='../index.html'">
                    [ HOME ]
                </button>
            </div>

            <!-- Visual Navigation Progress -->
            <div style="font-family: monospace; font-size: 14px; letter-spacing: 2px;">
                [<span style="background: var(--phosphor); color: var(--void);">##</span>............................] {card_num:02d}/15
            </div>

            <div class="nav-arrows">
                <button class="arrow-button" onclick="window.location.href='{prev_link}'"> &lt; PREV </button>
                <button class="arrow-button" onclick="window.location.href='{next_link}'"> NEXT &gt; </button>
            </div>
        </div>"""

assistant_template = """    <!-- ASCII ASSISTANT -->
    <div class="ascii-assistant">
        <div class="assistant-bubble">
            > [WHY_IT_MATTERS]:<br>
            {message}
        </div>
        <div class="assistant-avatar">
 .--.
 |__| .-------.
 |=.| |.-----.|
 |--| ||     ||
 |  | |'-----'|
 |__|~')_____('
        </div>
    </div>
    </div>"""

messages = {
    1: "Without variables, data is ephemeral. You'd have to re-type the universe every time it changes.",
    2: "You can't multiply a sentence by a sandwich. Types define the laws of physics for data.",
    3: "Data is potential energy. Operations convert it into kinetic action.",
    4: "A program that doesn't talk back is just a heater. I/O is the voice of the machine.",
    5: "Without conditionals, every day would be the exact same. Decisions create history.",
    6: "Logic is the bedrock. Truth is binary. There is no 'maybe' in the core.",
    7: "Doing it once is human. Doing it a billion times is machine. Loops leverage the machine's patience.",
    8: "Some tasks have no end. While loops are the heartbeat of the infinite.",
    9: "A variable holds a thought. A list holds a culture. Organizing data is organizing the mind.",
    10: "Iterating is visiting every house in the village. You don't miss a single one.",
    11: "Keys open doors. Dictionaries let you find the data without searching the whole world.",
    12: "Functions are tools you build yourself. Don't reinvent the wheel—call the function.",
    13: "Scope protects you from yourself. What happens in the function stays in the function.",
    14: "Standing on the shoulders of giants. Libraries let you use code you didn't have to write.",
    15: "Transformation complete. You are no longer a user. You are an architect."
}

def update_card(filename):
    path = os.path.join(cards_dir, filename)
    with open(path, 'r') as f:
        content = f.read()

    # Extract card number
    match = re.search(r'card_(\d+)\.html', filename)
    if not match: return
    card_num = int(match.group(1))
    
    # Calculate Progress
    total_ascii_width = 30
    filled_chars = int((card_num / 15) * total_ascii_width)
    empty_chars = total_ascii_width - filled_chars
    ascii_bar = "#" * filled_chars + "." * empty_chars
    
    css_param = (card_num / 15) * 100
    css_width = f"{css_param:.1f}%"

    # Template with dynamic ASCII bar
    prev_link = f"card_{card_num-1}.html" if card_num > 0 else "card_0.html"
    next_link = f"card_{card_num+1}.html" if card_num < 15 else "../index.html"
    if card_num == 0: prev_link = "../index.html" # Just in case

    new_nav = nav_template.format(
        card_num=card_num, 
        prev_link=prev_link, 
        next_link=next_link,
        ascii_bar=ascii_bar
    )
    
    # 2. Update Navigation (ASCII Bar in nav)
    # We first replace the nav template in the script global scope to use {ascii_bar}
    # Then we substitute the nav block in content
    
    # Regex to capture the bottom nav
    # We must be aggressive because the previous script might have left it in a varying state
    # We look for <div class="bottom-nav"> ... </div> ... <div class="progress-bar"> ... </div>
    # Actually, let's just replace the whole bottom section up to Close of hypercard-stack
    
    # Strategy: Find <div class="bottom-nav"> and everything until <div class="ascii-assistant"> or next identifiable block
    # But wait, progress bar is separate.
    
    # Let's rebuild the bottom section entirely: Navigation + CSS Progress Bar
    bottom_section = f"""        <div class="bottom-nav">
            <div class="nav-links">
                <button class="hc-button" onclick="window.location.href='../browse.html'">
                    [ BROWSE ]
                </button>
                <button class="hc-button" onclick="window.location.href='../index.html'">
                    [ HOME ]
                </button>
            </div>

            <!-- Visual Navigation Progress -->
            <div style="font-family: monospace; font-size: 14px; letter-spacing: 2px;">
                [<span style="background: var(--phosphor); color: var(--void);">{ascii_bar}</span>] {card_num:02d}/15
            </div>

            <div class="nav-arrows">
                <button class="arrow-button" onclick="window.location.href='{prev_link}'"> &lt; PREV </button>
                <button class="arrow-button" onclick="window.location.href='{next_link}'"> NEXT &gt; </button>
            </div>
        </div>

        <div class="progress-bar">
            <div class="progress-fill" style="width: {css_width}"></div>
        </div>
    </div>"""

    # We need to find where to insert this.
    # It replaces the existing bottom-nav and progress-bar and closing div.
    # This roughly matches: <div class="bottom-nav"> ... </div> ... <div class="progress-bar">...</div> ... </div>
    
    # Let's try to match from <div class="bottom-nav"> to the closing </div> of hypercard-stack (which is usually followed by ascii-assistant)
    
    regex = r'<div class="bottom-nav">[\s\S]*?    </div>(?=\s*<!-- ASCII ASSISTANT -->)'
    
    # If ascii assistant is NOT there (should be there from last run), we look for <script>
    if "<!-- ASCII ASSISTANT -->" not in content:
         # Fallback for fresh files (unlikely now)
         pass
         
    replacement = bottom_section
    content = re.sub(regex, replacement, content)

    # 3. Add Assistant & Close Wrapper (If not present)
    if "<!-- ASCII ASSISTANT -->" not in content:
        # This part handles the first run logic, but we are primarily updating now.
        # But let's keep the logic if we need to fix broken files.
        pass
    else:
        # If assistant IS present, we might want to ensure it's outside the layout wrapper?
        # Current structure: <div class="layout-wrapper"> <div class="hypercard-stack"> ... </div> <div class="ascii-assistant"> ... </div> </div>
        # My regex above replaced the closing </div> of hypercard-stack.
        # So structure becomes: <div class="layout-wrapper"> <div class="hypercard-stack"> ... [New Bottom Section with closing div] <div class="ascii-assistant">
        pass

    # Revert Sticky Nav (zero2one -> Home)
    content = content.replace('class="sticky-nav-link">zero2one</a>', 'class="sticky-nav-link">Home</a>')

    # Add Favicon if missing
    if "static/favicon.svg" not in content:
        favicon_link = '    <link rel="icon" href="../static/favicon.svg" type="image/svg+xml">\n    <link rel="stylesheet"'
        content = content.replace('<link rel="stylesheet"', favicon_link)

    with open(path, 'w') as f:
        f.write(content)
    print(f"Updated {filename} with Progress {css_width}")

# Run for 1 to 15
for i in range(1, 16):
    update_card(f"card_{i}.html")
