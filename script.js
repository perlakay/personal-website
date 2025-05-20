document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.querySelector('.terminal-content');
    const currentInput = document.getElementById('current-input');
    const matrixOverlay = document.getElementById('matrixOverlay');
    const accessGranted = document.getElementById('accessGranted');
    const terminalWindow = document.getElementById('terminal-window');
    const terminalIcon = document.getElementById('terminal-icon');
    const closeButton = document.getElementById('close-terminal');
    let commandHistory = [];
    let historyIndex = -1;
    const terminalPrompt = 'visitor@kali:~$';
    let isFirstOpen = true;

    // --- File Manager Logic ---
    const filesIcon = document.getElementById('files-icon');
    const fileManagerWindow = document.getElementById('file-manager-window');
    const closeFileManager = document.getElementById('close-file-manager');
    const fileManagerContent = document.getElementById('file-manager-content');
    const fileManagerBack = document.getElementById('file-manager-back');
    const fileManagerPath = document.getElementById('file-manager-path');

    // Example file structure
    const fileStructure = {
        root: [
            { type: 'folder', name: 'Documents', contents: [
                { type: 'file', name: 'resume.pdf', content: 'This is a fake resume preview.' },
                { type: 'file', name: 'coverletter.txt', content: 'This is a fake cover letter.' }
            ] },
            { type: 'folder', name: 'Pictures', contents: [
                { type: 'file', name: 'selfie.png', content: 'Pretend this is a picture.' }
            ] },
            { type: 'file', name: 'notes.txt', content: 'These are some notes.' },
            { type: 'file', name: 'todo.md', content: 'TODO:\n- Make a cool website\n- Hack the planet' }
        ]
    };

    let currentFolder = fileStructure.root;
    let folderStack = [];

    // Helper to get current path as string
    function getCurrentPath() {
        let path = ['Home'];
        for (const folder of folderStack) {
            if (folder.name) path.push(folder.name);
        }
        if (folderStack.length && folderStack[folderStack.length-1].name !== undefined) {
            if (currentFolder !== fileStructure.root) {
                // Find current folder name
                const last = folderStack[folderStack.length-1];
                if (last && last.name) path.push(last.name);
            }
        }
        return path.join(' > ');
    }

    function renderFileList(folder) {
        // Update path and back button
        fileManagerPath.textContent = getCurrentPath();
        fileManagerBack.disabled = folderStack.length === 0;

        let html = '<ul class="file-list">';
        folder.forEach((item, idx) => {
            html += `<li data-idx="${idx}" data-type="${item.type}"><span class="file-icon ${item.type}"></span>${item.name}</li>`;
        });
        html += '</ul>';
        fileManagerContent.innerHTML = html;
    }

    function showFilePreview(file) {
        fileManagerPath.textContent = getCurrentPath() + ' > ' + file.name;
        fileManagerBack.disabled = false;
        fileManagerContent.innerHTML = `<div style="padding:16px;"><b>${file.name}</b><pre style="margin-top:10px;">${file.content}</pre><button id="back-to-folder" style="margin-top:16px;">Back</button></div>`;
        document.getElementById('back-to-folder').onclick = () => {
            if (folderStack.length > 0) {
                const prev = folderStack.pop();
                currentFolder = prev.contents || fileStructure.root;
                renderFileList(currentFolder);
            } else {
                renderFileList(fileStructure.root);
            }
        };
    }

    // Function to show welcome message
    function showWelcomeMessage() {
        addOutput('Hi, I\'m Perly! Type --info for a list of commands.');
    }

    // Initial welcome message
    showWelcomeMessage();

    // Handle terminal icon double-click
    terminalIcon.addEventListener('dblclick', () => {
        terminalWindow.classList.remove('hidden');
        if (isFirstOpen) {
            isFirstOpen = false;
        }
    });

    // Handle close button click
    closeButton.addEventListener('click', () => {
        terminalWindow.classList.add('hidden');
    });

    // Handle keyboard input
    document.addEventListener('keydown', (e) => {
        if (terminalWindow.classList.contains('hidden')) return;
        
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

    // Double-click Files icon to open file manager
    filesIcon.addEventListener('dblclick', () => {
        fileManagerWindow.classList.remove('hidden');
        renderFileList(currentFolder);
    });

    // Close file manager
    closeFileManager.addEventListener('click', () => {
        fileManagerWindow.classList.add('hidden');
        // Reset to root on close
        currentFolder = fileStructure.root;
        folderStack = [];
    });

    // Back button logic
    fileManagerBack.addEventListener('click', () => {
        if (folderStack.length > 0) {
            const prev = folderStack.pop();
            currentFolder = prev.contents || fileStructure.root;
            renderFileList(currentFolder);
        }
    });

    // Update: when opening a folder, push its info to folderStack
    fileManagerContent.addEventListener('dblclick', (e) => {
        const li = e.target.closest('li');
        if (!li) return;
        const idx = li.getAttribute('data-idx');
        const type = li.getAttribute('data-type');
        if (type === 'folder') {
            folderStack.push({ name: currentFolder[idx].name, contents: currentFolder });
            currentFolder = currentFolder[idx].contents;
            renderFileList(currentFolder);
        } else if (type === 'file') {
            showFilePreview(currentFolder[idx]);
        }
    });
}); 