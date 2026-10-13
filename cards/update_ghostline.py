import os
import re
import glob

ROOT_DIR = '/home/kyotsketeh/python-zero2one'
CARDS_DIR = os.path.join(ROOT_DIR, 'cards')

# Concise, concept-matched insights for every page & card (zero emojis, low cognitive load)
WIZARD_TIPS = {
    'index': "Welcome, apprentice. Use the Left and Right arrow keys to move between cards, click the sun in the top corner to switch lighting, or choose a custom pixel cursor.",
    'browse': "Follow the cards in sequence from 0 to 15 to build your mental model step by step, or filter by topic to revisit any concept.",
    0: "A computer has zero common sense—it does literally what you say, never what you mean. Define every step explicitly.",
    1: "Think of a program as a scroll read strictly from top to bottom. Order is the first law of code.",
    2: "A variable is a labeled container for data. In Python, = is not a balance scale—it pours the value on the right into the label on the left.",
    3: "Data types tell Python whether '25' is text to read or a number to count. Type casting (int(), str()) converts one into the other.",
    4: "Use print() to speak and input() to listen. Always store input() inside a variable, and wrap it in int() when you need math.",
    5: "Comparisons ask a yes-or-no question and always return True or False. Remember: = stores a value, while == checks if two values match.",
    6: "Logical operators combine conditions: 'and' requires both to be True, 'or' accepts either one, and 'not' flips True and False.",
    7: "An if-elif-else chain is a branching tree. Python takes the first branch whose condition is True and skips the rest.",
    8: "Nested conditionals place one check inside another. The inner check only runs when the outer gate is already True.",
    9: "A while loop repeats as long as its condition stays True. Always update the checked variable inside the loop so it can eventually stop.",
    10: "When you know how many steps to run, use a for loop with range(). Remember that range(5) counts 0, 1, 2, 3, 4—stopping before 5.",
    11: "Lists hold ordered collections under one name. Every slot is numbered starting at [0], so the final item is at len(list) - 1.",
    12: "A function packages reusable logic: parameters receive the inputs, the body processes them, and return sends back the result.",
    13: "Lists look up items by position, while dictionaries look them up by key. Pairing values with clear keys makes data self-explanatory.",
    14: "Like a bonsai where every branch is a smaller tree, recursion shrinks a problem step by step until it reaches a simple base case.",
    15: "Your core mental models are complete. Languages change, but variables, flow control, data structures, and abstraction remain constant."
}

SVG_GRID = '<svg class="svg-icon" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>'
SVG_HOME = '<svg class="svg-icon" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>'
SVG_LEFT = '<svg class="svg-icon" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>'
SVG_RIGHT = '<svg class="svg-icon" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>'
SVG_EXT = '<svg class="svg-icon" style="width:13px;height:13px;" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>'

SVG_USER_LARGE = '<svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--accent-secondary)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
SVG_COMP_LARGE = '<svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--accent-primary)" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>'

EMOJI_PATTERN = re.compile(r'[✦✨🌱🌳🌸💧🚀🔄🧭🥪🧙🌾🍞📥🔥🧈📦👆🧪👤💻🖥⚫💡🔒🛑🪨⚡🔑🌿✅❌⬜♨⚠\ufe0f]+ ?')


def strip_emojis_and_fix_icons(content, filename):
    # Specific visual icon replacements before general emoji strip
    if filename == 'card_4.html':
        content = content.replace('<div style="font-size: 40px;">👤</div>', f'<div>{SVG_USER_LARGE}</div>')
        content = content.replace('<div style="font-size: 40px;">💻</div>', f'<div>{SVG_COMP_LARGE}</div>')
        content = content.replace('# ❌ WRONG', '# [AVOID] ')
        content = content.replace('# ✅ CORRECT', '# [GOOD] ')
    if filename == 'card_6.html':
        content = content.replace(
            "${result ? '💡' : '⚫'}",
            "${result ? 'ON' : 'OFF'}"
        )
    if filename == 'card_1.html':
        content = content.replace('"Stage: [ 🌾 Raw Ingredients Ready ] → ⬜ → ⬜ → ⬜ → ⬜"', '"Stage 0: [ Ready ] -> [ ] -> [ ] -> [ ] -> [ ]"')
        content = content.replace('"Stage: [ 🍞 Bread Slice ] → ⬜ → ⬜ → ⬜ → ⬜"', '"Stage 1: [ Bread Slice ] -> [ ] -> [ ] -> [ ] -> [ ]"')
        content = content.replace('"Stage: 🍞 → [ 📥 In Toaster ] → ⬜ → ⬜ → ⬜"', '"Stage 2: [ Bread ] -> [ In Toaster ] -> [ ] -> [ ] -> [ ]"')
        content = content.replace('"Stage: 🍞 → 📥 → [ 🔥 Toasting... ] → ⬜ → ⬜"', '"Stage 3: [ Bread ] -> [ Toaster ] -> [ Heating ] -> [ ] -> [ ]"')
        content = content.replace('"Stage: 🍞 → 📥 → 🔥 → [ ♨️ Crisp Toast ] → ⬜"', '"Stage 4: [ Bread ] -> [ Toaster ] -> [ Heating ] -> [ Crisp Toast ] -> [ ]"')
        content = content.replace('"Stage: 🍞 → 📥 → 🔥 → ♨️ → [ 🧈✨ Golden Buttered Toast! ]"', '"Stage 5: [ Bread ] -> [ Toaster ] -> [ Heating ] -> [ Toast ] -> [ Buttered Toast ]"')

    # Strip remaining emojis
    content = EMOJI_PATTERN.sub('', content)

    # Clean up terminal-style // HEADERS if any remain
    content = content.replace('// CORE_PRINCIPLES', 'Core Principles')
    content = content.replace('// SYSTEM_UPGRADE_PATH', 'Where to Go Next')
    content = content.replace('// ARCHITECT_PROTOCOLS', 'Starter Projects')
    return content


def build_bottom_nav(is_card, card_num=None):
    prefix = '../' if is_card else ''
    if is_card:
        prev_link = f"card_{card_num - 1}.html" if card_num > 0 else "../index.html"
        next_link = f"card_{card_num + 1}.html" if card_num < 15 else "../index.html"
        prev_attr = f'onclick="window.location.href=\'{prev_link}\'"'
        next_attr = f'onclick="window.location.href=\'{next_link}\'"'
        css_width = f"{(card_num / 15) * 100:.1f}%"
    elif card_num == 'index':
        prev_attr = 'disabled'
        next_attr = 'onclick="window.location.href=\'cards/card_0.html\'"'
        css_width = "0%"
    else:  # browse
        prev_attr = 'onclick="window.location.href=\'index.html\'"'
        next_attr = 'onclick="window.location.href=\'cards/card_0.html\'"'
        css_width = "100%"

    return f"""        <div class="bottom-nav">
            <div class="nav-links">
                <button class="hc-button" onclick="window.location.href='{prefix}browse.html'">
                    {SVG_GRID} Browse
                </button>
                <button class="hc-button" onclick="window.location.href='{prefix}index.html'">
                    {SVG_HOME} Home
                </button>
            </div>

            <div class="nav-progress-indicator">
                <a href="https://meresophist.xyz" target="_blank" rel="noopener">meresophist.xyz {SVG_EXT}</a>
            </div>

            <div class="nav-arrows">
                <button class="arrow-button" data-nav="prev" {prev_attr}>{SVG_LEFT} Prev</button>
                <button class="arrow-button" data-nav="next" {next_attr}>Next {SVG_RIGHT}</button>
            </div>
        </div>

        <div class="progress-bar">
            <div class="progress-fill" style="width: {css_width}"></div>
        </div>
    </div>"""


def build_assistant(is_card, key):
    static_prefix = '../static' if is_card else 'static'
    tip = WIZARD_TIPS[key]
    return f"""    <div class="ascii-assistant">
        <div class="assistant-bubble">
            {tip}
        </div>
        <div class="assistant-avatar">
            <img src="{static_prefix}/images/mascot.png" alt="Wizard Guide" />
        </div>
    </div>
    </div>"""


def update_file(filepath):
    filename = os.path.basename(filepath)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    is_card = filename.startswith('card_')
    if is_card:
        card_num = int(re.search(r'card_(\d+)\.html', filename).group(1))
        key = card_num
        badge_text = f"{card_num} / 15"
    elif filename == 'index.html':
        card_num = 'index'
        key = 'index'
        badge_text = "Start"
    else:
        card_num = 'browse'
        key = 'browse'
        badge_text = "16 Cards"

    content = strip_emojis_and_fix_icons(content, filename)

    # Simplify .card-header (just title and clean badge)
    header_regex = r'<div class="card-header">[\s\S]*?</div>\s*(?=<div class="card-content">)'
    title_match = re.search(r'<div class="card-title">(.*?)</div>', content)
    card_title = title_match.group(1).strip() if title_match else "Python Zero2One"
    clean_header = f"""<div class="card-header">
            <div class="card-title">{card_title}</div>
            <div class="card-number">{badge_text}</div>
        </div>
        """
    content = re.sub(header_regex, clean_header, content, count=1)

    # Replace from <div class="bottom-nav"> through the end of .layout-wrapper (right before <script src="...navigation.js">)
    bottom_and_assistant = build_bottom_nav(is_card, card_num) + "\n\n" + build_assistant(is_card, key) + "\n\n    "
    footer_regex = r'<div class="bottom-nav">[\s\S]*?(?=<script src="[^"]*navigation\.js"></script>)'
    content = re.sub(footer_regex, bottom_and_assistant, content, count=1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Refined {filename}")


if __name__ == '__main__':
    update_file(os.path.join(ROOT_DIR, 'index.html'))
    update_file(os.path.join(ROOT_DIR, 'browse.html'))
    for i in range(16):
        update_file(os.path.join(CARDS_DIR, f'card_{i}.html'))
