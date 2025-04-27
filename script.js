// Initialize AdSense
(adsbygoogle = window.adsbygoogle || []).push({});

// Tool Cards Interaction
document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', function() {
        const toolName = this.querySelector('h3').textContent;
        handleToolClick(toolName);
    });
});

// Tool Handler
function handleToolClick(toolName) {
    // Create modal for tool interface
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${toolName}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="upload-area" id="uploadArea">
                    <p>Drag & Drop files here or</p>
                    <button class="upload-btn">Choose Files</button>
                    <input type="file" hidden id="fileInput" multiple>
                </div>
                <div class="processing-options" style="display: none;">
                    <!-- Options will be dynamically added based on tool -->
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .tool-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1001;
        }

        .modal-content {
            background: white;
            border-radius: 10px;
            width: 90%;
            max-width: 600px;
            padding: 2rem;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .close-modal {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }

        .upload-area {
            border: 2px dashed #4A90E2;
            border-radius: 10px;
            padding: 2rem;
            text-align: center;
            margin-bottom: 1.5rem;
        }

        .upload-btn {
            background: #4A90E2;
            color: white;
            border: none;
            padding: 0.5rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 1rem;
        }

        .processing-options {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 10px;
        }
    `;
    document.head.appendChild(style);

    // Handle modal close
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });

    // Handle file upload
    const uploadArea = modal.querySelector('#uploadArea');
    const fileInput = modal.querySelector('#fileInput');
    const uploadBtn = modal.querySelector('.upload-btn');

    uploadBtn.addEventListener('click', () => fileInput.click());

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#357ABD';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#4A90E2';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#4A90E2';
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', () => {
        handleFiles(fileInput.files);
    });
}

// File Handler
function handleFiles(files) {
    const validTypes = {
        'image/jpeg': true,
        'image/png': true,
        'image/gif': true,
        'image/svg+xml': true,
        'application/pdf': true
    };

    Array.from(files).forEach(file => {
        if (validTypes[file.type]) {
            // Process file based on tool type
            processFile(file);
        } else {
            alert('Invalid file type. Please upload images or PDFs only.');
        }
    });
}

// File Processor
function processFile(file) {
    // Show processing options
    const processingOptions = document.querySelector('.processing-options');
    processingOptions.style.display = 'block';

    // Add tool-specific options
    if (file.type.startsWith('image/')) {
        processingOptions.innerHTML = `
            <h3>Processing Options</h3>
            <div class="option-group">
                <label>Quality:</label>
                <input type="range" min="1" max="100" value="80">
                <span>80%</span>
            </div>
            <button class="process-btn">Process File</button>
        `;
    }

    // Handle processing
    const processBtn = processingOptions.querySelector('.process-btn');
    if (processBtn) {
        processBtn.addEventListener('click', () => {
            // Implement actual processing logic here
            console.log('Processing file:', file.name);
            // Show loading indicator
            processBtn.textContent = 'Processing...';
            processBtn.disabled = true;
        });
    }
}

// Mobile Navigation
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 80) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
}); 