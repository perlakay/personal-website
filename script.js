document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.querySelector('.terminal-content');
    const currentInput = document.getElementById('current-input');
    const matrixOverlay = document.getElementById('matrixOverlay');
    const accessGranted = document.getElementById('accessGranted');
    let commandHistory = [];
    let historyIndex = -1;
    const terminalPrompt = 'visitor@kali:~$';

    // Initial welcome message
    addOutput('Hi, I\'m Perly! Type --info for a list of commands.');

    // Handle keyboard input
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = currentInput.textContent.trim();
            if (command) {
                handleCommand(command);
                commandHistory.push(command);
                historyIndex = commandHistory.length;
            }
            currentInput.textContent = '';
        } else if (e.key === 'Backspace') {
            currentInput.textContent = currentInput.textContent.slice(0, -1);
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                currentInput.textContent = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                currentInput.textContent = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                currentInput.textContent = '';
            }
        } else if (e.key.length === 1) {
            currentInput.textContent += e.key;
        }
    });

    function handleCommand(command) {
        addOutput(`${terminalPrompt} ${command}`, 'command');
        
        switch (command.toLowerCase()) {
            case '--info':
                showInfo();
                break;
            case '--projects':
                showProjects();
                break;
            case '--inprogress':
                showInProgress();
                break;
            case '--ctfs':
                showCTFs();
                break;
            case '--about':
                showAbout();
                break;
            case '--contact':
                showContact();
                break;
            case '--help':
                showHelp();
                break;
            case 'clear':
                clearTerminal();
                break;
            case '--hack':
                startGlitchAccessGranted();
                break;
            default:
                addOutput(`Command not found: ${command}. Type --help for available commands.`, 'error');
        }
    }

    function showInProgress() {
        addOutput(`
In Progress Projects:
1. Roastmysecurity.com - Tool help founders see all public info thorugh URL scan
2. Codemate - Tinder for tech projects (coming soon)
3. Unuvo - secure vibe coding (coming soon)
        `);
    }

    function showCTFs() {
        addOutput(`
CTFs & Challenges:
1. HacAPIs - Hacking APIs conference hacakthon, 5th place, won some sick lego 10/10
2. Amazon x WiCyS - Amazon hackathon, highest ranked undergrad student in NYC 
3. Target cyber challenge - top 50/800+ industry professionals at 18
4. OWASP x Pensar AI Hackathon - Winner, 2025
5. Cyber NYC - finalist, was not able compete at finals though :(

        `);
    }

    // Remove matrix rain, just glitch and access granted
    function startGlitchAccessGranted() {
        matrixOverlay.style.display = 'block';
        document.body.classList.add('glitch');
        setTimeout(() => {
            accessGranted.style.display = 'block';
            setTimeout(() => {
                matrixOverlay.style.display = 'none';
                document.body.classList.remove('glitch');
                accessGranted.style.display = 'none';
            }, 2000);
        }, 1200);
    }

    function addOutput(text, className = '') {
        const output = document.createElement('div');
        output.className = `output ${className}`;
        output.innerHTML = text;
        terminalContent.insertBefore(output, terminalContent.lastElementChild);
    }

    function showInfo() {
        addOutput('<img src="ascii.png" alt="ABOUT ME ASCII Art" class="ascii-art-img">', '');
        addOutput(`
Available commands:
--help         : Show this help message
--projects     : View past projects
--inprogress   : View in-progress projects
--ctfs         : View CTFs & challenges
--about        : Learn more about me
--contact      : My contact info
--info         : Show this help message
--hack         : ???
clear          : Clear the terminal
        `, 'info');
    }

    function showProjects() {
        addOutput(`
Past Projects:
1. Security scanner - CLI tool to scan URLs
   <a href="https://github.com/perlakay/security-scanner" target="_blank">GitHub Repo</a>
2. Insecure AI agent - OWASP x Pensar ai hackathon winning project
   Built a text summerizer that was insecure as possible to demonstrate security risks of agents. Project was also showcased at RSA
   <a href="https://github.com/perlakay/insecureagent2" target="_blank">GitHub Repo</a>
3. Flappy Bird - Game clone, one of my first projects
   <a href="https://github.com/perlakay/flappybird" target="_blank">GitHub Repo</a>
        `);
    }

    function showAbout() {
        addOutput(`\nAbout Me:\nHey! I'm Perly, I used to make art and now I study cybersecurity.\nI'm currenlty a BS/MS student at John Jay College of Criminal Justice,\nand incoming vulnerability management intern Universal Music Group. \n    `);
    }

    function showContact() {
        addOutput(`
Contact Information:
Email: perla.kay22@gmail.com
GitHub: github.com/perla.kay
LinkedIn: linkedin.com/in/perla-dahan
X: x.com/_shark_byte
        `);
    }

    function showHelp() {
        showInfo();
    }

    function clearTerminal() {
        const outputs = document.querySelectorAll('.output');
        outputs.forEach(output => output.remove());
        addOutput("Hi, I'm Perly! Type --info for a list of commands.");
    }
}); 