// Global variables
let blogs = [];
let selectedAmount = 0;
let chatbotActive = false;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogs();
    loadBlogs();
});

// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Chatbot functionality
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbotActive = !chatbotActive;
    
    if (chatbotActive) {
        chatbot.classList.add('active');
    } else {
        chatbot.classList.remove('active');
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addChatMessage(message, 'user');
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const response = generateAIResponse(message);
            addChatMessage(response, 'bot');
        }, 1000);
    }
}

function addChatMessage(message, sender) {
    const chatBody = document.getElementById('chatbotBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function generateAIResponse(message) {
    const responses = {
        'भोजन': 'हमारे भोजन सहायता कार्यक्रम में दैनिक भोजन वितरण, राशन किट वितरण और पोषण कार्यक्रम शामिल हैं। क्या आप किसी विशिष्ट सहायता के लिए आवेदन करना चाहते हैं?',
        'कपड़े': 'हम सभी मौसमों के लिए कपड़े, जूते और अन्य आवश्यक वस्तुएं प्रदान करते हैं। आप हमारे सेंटर पर जाकर या ऑनलाइन आवेदन कर सकते हैं।',
        'शिक्षा': 'हमारे शिक्षा कार्यक्रम में निःशुल्क शिक्षा, स्कॉलरशिप और कौशल विकास शामिल है। कृपया अपनी उम्र और आवश्यकताओं के बारे में बताएं।',
        'आवास': 'हम अस्थायी आश्रय, आश्रय गृह और घर निर्माण सहायता प्रदान करते हैं। आपकी स्थिति के अनुसार हम उचित सहायता की व्यवस्था कर सकते हैं।',
        'दान': 'आपका दान हमारे काम को आगे बढ़ाने में मदद करता है। आप एक बार या मासिक दान कर सकते हैं। ₹100 से 10 लोगों को भोजन मिल सकता है।',
        'स्वयंसेवक': 'हमें स्वयंसेवकों की जरूरत है! आप फूड डिस्ट्रिब्यूशन, टीचिंग या एडमिनिस्ट्रेशन में मदद कर सकते हैं।',
        'help': 'मैं आपकी सहायता के लिए यहां हूं। आप भोजन, कपड़े, शिक्षा, आवास या दान के बारे में पूछ सकते हैं।',
        'मदद': 'मैं आपकी सहायता के लिए यहां हूं। आप भोजन, कपड़े, शिक्षा, आवास या दान के बारे में पूछ सकते हैं।',
        'food': 'हमारे भोजन सहायता कार्यक्रम में दैनिक भोजन वितरण, राशन किट वितरण और पोषण कार्यक्रम शामिल हैं।',
        'clothing': 'हम सभी मौसमों के लिए कपड़े, जूते और अन्य आवश्यक वस्तुएं प्रदान करते हैं।',
        'education': 'हमारे शिक्षा कार्यक्रम में निःशुल्क शिक्षा, स्कॉलरशिप और कौशल विकास शामिल है।',
        'housing': 'हम अस्थायी आश्रय, आश्रय गृह और घर निर्माण सहायता प्रदान करते हैं।',
        'donate': 'आपका दान हमारे काम को आगे बढ़ाने में मदद करता है। आप एक बार या मासिक दान कर सकते हैं।',
        'volunteer': 'हमें स्वयंसेवकों की जरूरत है! आप विभिन्न कार्यक्रमों में मदद कर सकते हैं।',
        'contact': 'आप हमसे +91 98765 43210 पर कॉल कर सकते हैं या help@saharahelp.org पर ईमेल भेज सकते हैं।',
        'संपर्क': 'आप हमसे +91 98765 43210 पर कॉल कर सकते हैं या help@saharahelp.org पर ईमेल भेज सकते हैं।',
        'phone': 'हमारा फोन नंबर है: +91 98765 43210',
        'email': 'हमारा ईमेल है: help@saharahelp.org',
        'address': 'हमारा पता है: 123 सेवा मार्ग, नई दिल्ली - 110001',
        'पता': 'हमारा पता है: 123 सेवा मार्ग, नई दिल्ली - 110001'
    };
    
    // Simple keyword matching
    for (let key in responses) {
        if (message.toLowerCase().includes(key.toLowerCase())) {
            return responses[key];
        }
    }
    
    // Default responses
    const defaultResponses = [
        'मैं आपकी मदद करने के लिए यहां हूं। आप भोजन, कपड़े, शिक्षा, आवास या दान के बारे में पूछ सकते हैं।',
        'कृपया अपनी समस्या या आवश्यकता के बारे में विस्तार से बताएं। मैं आपकी बेहतर सहायता कर सकूंगा।',
        'आप हमारे कार्यक्रमों के बारे में जानकारी प्राप्त कर सकते हैं या सहायता के लिए आवेदन कर सकते हैं।',
        'मैं आपके सवालों का जवाब देने के लिए यहां हूं। कृपया बताएं कि आपको किस प्रकार की सहायता चाहिए?'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Program modal functionality
function openProgramModal(programType) {
    const modal = document.getElementById('programModal');
    const content = document.getElementById('programModalContent');
    
    const programDetails = {
        'food': {
            title: 'भोजन सहायता कार्यक्रम',
            description: 'हमारा भोजन सहायता कार्यक्रम जरूरतमंद लोगों को पौष्टिक भोजन प्रदान करता है।',
            services: [
                'दैनिक भोजन वितरण - सुबह 8 बजे से शाम 6 बजे तक',
                'राशन किट वितरण - मासिक राशन पैकेट',
                'पोषण कार्यक्रम - बच्चों और गर्भवती महिलाओं के लिए',
                'सामुदायिक रसोई - 500+ लोगों के लिए दैनिक भोजन'
            ],
            eligibility: 'BPL कार्ड धारक, दैनिक मजदूर, बेघर व्यक्ति',
            contact: 'भोजन सहायता के लिए: +91 98765 43210'
        },
        'clothing': {
            title: 'कपड़े सहायता कार्यक्रम',
            description: 'सभी मौसमों के लिए कपड़े, जूते और अन्य आवश्यक वस्तुओं का वितरण।',
            services: [
                'मौसमी कपड़े - गर्मी, सर्दी और बारिश के लिए',
                'स्कूल यूनिफॉर्म - स्कूल जाने वाले बच्चों के लिए',
                'जूते-चप्पल - सभी साइज़ में उपलब्ध',
                'कंबल वितरण - सर्दियों में विशेष वितरण'
            ],
            eligibility: 'परिवार की आय ₹15,000 से कम, स्कूली बच्चे',
            contact: 'कपड़े सहायता के लिए: +91 98765 43211'
        },
        'education': {
            title: 'शिक्षा सहायता कार्यक्रम',
            description: 'बच्चों की शिक्षा, स्कॉलरशिप और कौशल विकास के लिए व्यापक कार्यक्रम।',
            services: [
                'निःशुल्क शिक्षा - कक्षा 1 से 12 तक',
                'स्कॉलरशिप प्रोग्राम - मेधावी छात्रों के लिए',
                'कौशल विकास - युवाओं के लिए तकनीकी प्रशिक्षण',
                'डिजिटल शिक्षा - कंप्यूटर और इंटरनेट की सुविधा'
            ],
            eligibility: '6-25 साल के बच्चे और युवा, आर्थिक रूप से कमजोर परिवार',
            contact: 'शिक्षा सहायता के लिए: +91 98765 43212'
        },
        'housing': {
            title: 'आवास सहायता कार्यक्रम',
            description: 'अस्थायी आवास, आश्रय गृह और स्थायी आवास समाधान।',
            services: [
                'अस्थायी आश्रय - तत्काल आवास की जरूरत के लिए',
                'आश्रय गृह - महिलाओं और बच्चों के लिए सुरक्षित आवास',
                'घर निर्माण सहायता - कच्चे घरों के लिए सहायता',
                'किराया सहायता - आर्थिक सहायता के लिए'
            ],
            eligibility: 'बेघर व्यक्ति, आपातकालीन स्थिति, झुग्गी निवासी',
            contact: 'आवास सहायता के लिए: +91 98765 43213'
        }
    };
    
    const program = programDetails[programType];
    
    content.innerHTML = `
        <h2>${program.title}</h2>
        <p>${program.description}</p>
        <h3>सेवाएं:</h3>
        <ul>
            ${program.services.map(service => `<li>${service}</li>`).join('')}
        </ul>
        <h3>पात्रता:</h3>
        <p>${program.eligibility}</p>
        <h3>संपर्क:</h3>
        <p>${program.contact}</p>
        <div style="margin-top: 2rem;">
            <button class="btn-primary" onclick="applyForProgram('${programType}')">
                <i class="fas fa-paper-plane"></i> आवेदन करें
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function applyForProgram(programType) {
    alert(`${programType} कार्यक्रम के लिए आवेदन प्रक्रिया शुरू की गई है। कृपया संपर्क फॉर्म भरें।`);
    closeModal('programModal');
    scrollToSection('contact');
}

// Blog functionality
function initializeBlogs() {
    blogs = [
        {
            id: 1,
            title: 'राम की सफलता की कहानी',
            author: 'सुनीता शर्मा',
            category: 'success',
            content: 'राम एक गरीब परिवार से आता था लेकिन हमारे शिक्षा कार्यक्रम की मदद से वह इंजीनियर बन गया। आज वह अपने गांव में एक स्कूल चलाता है और दूसरे बच्चों की मदद करता है। यह कहानी दिखाती है कि सही मार्गदर्शन और सहायता से कोई भी अपने सपने पूरे कर सकता है।',
            date: '2024-01-15',
            image: 'd1.jpg'
        },
        {
            id: 2,
            title: 'नया भोजन वितरण केंद्र खुला',
            author: 'अमित कुमार',
            category: 'news',
            content: 'हमारा नया भोजन वितरण केंद्र खुला है जो रोजाना 1000 लोगों को भोजन प्रदान करेगा। यह केंद्र आधुनिक सुविधाओं से लैस है और स्वच्छता के उच्चतम मानकों का पालन करता है। हमारे स्वयंसेवक यहां रोजाना सुबह 8 बजे से शाम 6 बजे तक सेवा प्रदान करते हैं।',
            date: '2024-01-10',
            image: 'd2.jpg'
        },
        {
            id: 3,
            title: 'स्वयंसेवकों का योगदान',
            author: 'प्रिया गुप्ता',
            category: 'volunteer',
            content: 'हमारे स्वयंसेवकों ने इस महीने 500 परिवारों तक राशन पहुंचाया है। उनकी मेहनत और समर्पण के कारण हम जरूरतमंद लोगों तक पहुंच पा रहे हैं। अगर आप भी स्वयंसेवक बनना चाहते हैं तो हमसे संपर्क करें। हर छोटी मदद भी किसी के लिए बड़ा बदलाव ला सकती है।',
            date: '2024-01-05',
            image: 'd3.jpg'
        },
        {
            id: 4,
            title: 'शिक्षा कार्यक्रम में नई पहल',
            author: 'डॉ. राजेश वर्मा',
            category: 'program',
            content: 'हमने अपने शिक्षा कार्यक्रम में डिजिटल शिक्षा की शुरुआत की है। अब बच्चे कंप्यूटर और इंटरनेट का उपयोग सीख सकते हैं। यह पहल उन्हें भविष्य के लिए तैयार करने में मदद करेगी। हमारे पास अनुभवी शिक्षक हैं जो बच्चों को व्यावहारिक ज्ञान प्रदान करते हैं।',
            date: '2024-01-01',
            image: 'd4.jpg'
        }
    ];
}

function loadBlogs() {
    const blogGrid = document.getElementById('blogGrid');
    blogGrid.innerHTML = '';
    
    blogs.forEach(blog => {
        const blogCard = createBlogCard(blog);
        blogGrid.appendChild(blogCard);
    });
}

function createBlogCard(blog) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    
    const categoryName = {
        'success': 'सफलता',
        'news': 'समाचार',
        'program': 'कार्यक्रम',
        'volunteer': 'स्वयंसेवक'
    };
    
    card.innerHTML = `
        <img src="${blog.image}" alt="${blog.title}">
        <div class="blog-card-content">
            <h3>${blog.title}</h3>
            <div class="blog-meta">
                <span class="blog-category">${categoryName[blog.category]}</span>
                <span>${blog.date}</span>
            </div>
            <p>${blog.content.substring(0, 100)}...</p>
            <div style="margin-top: 1rem;">
                <button class="btn-program" onclick="readFullBlog(${blog.id})">पूरा पढ़ें</button>
            </div>
        </div>
    `;
    
    return card;
}

function readFullBlog(blogId) {
    const blog = blogs.find(b => b.id === blogId);
    if (blog) {
        const categoryName = {
            'success': 'सफलता की कहानी',
            'news': 'समाचार',
            'program': 'कार्यक्रम अपडेट',
            'volunteer': 'स्वयंसेवक'
        };
        
        alert(`${blog.title}\n\nश्रेणी: ${categoryName[blog.category]}\nलेखक: ${blog.author}\nदिनांक: ${blog.date}\n\n${blog.content}`);
    }
}

function searchBlogs() {
    const searchTerm = document.getElementById('blogSearch').value.toLowerCase();
    const filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm) || 
        blog.content.toLowerCase().includes(searchTerm) ||
        blog.author.toLowerCase().includes(searchTerm)
    );
    
    const blogGrid = document.getElementById('blogGrid');
    blogGrid.innerHTML = '';
    
    if (filteredBlogs.length === 0) {
        blogGrid.innerHTML = '<p style="text-align: center; color: #6b7280; grid-column: 1/-1;">कोई ब्लॉग नहीं मिला।</p>';
    } else {
        filteredBlogs.forEach(blog => {
            const blogCard = createBlogCard(blog);
            blogGrid.appendChild(blogCard);
        });
    }
}

function openBlogCreator() {
    document.getElementById('blogCreatorModal').classList.add('active');
}

function createBlogPost(event) {
    event.preventDefault();
    
    const title = document.getElementById('blogTitle').value;
    const author = document.getElementById('blogAuthor').value;
    const category = document.getElementById('blogCategory').value;
    const content = document.getElementById('blogContent').value;
    
    const newBlog = {
        id: blogs.length + 1,
        title: title,
        author: author,
        category: category,
        content: content,
        date: new Date().toISOString().split('T')[0],
        image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    
    blogs.unshift(newBlog);
    loadBlogs();
    closeModal('blogCreatorModal');
    
    // Clear form
    document.getElementById('blogTitle').value = '';
    document.getElementById('blogAuthor').value = '';
    document.getElementById('blogContent').value = '';
    
    alert('ब्लॉग सफलतापूर्वक प्रकाशित हुआ!');
}

// Donation functionality
function selectAmount(amount) {
    selectedAmount = amount;
    document.getElementById('customAmount').value = amount;
    
    // Update button styles
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
}

function processDonation() {
    const amount = document.getElementById('customAmount').value || selectedAmount;
    
    if (!amount || amount <= 0) {
        alert('कृपया राशि चुनें या डालें');
        return;
    }
    
    const impact = Math.floor(amount/100);
    alert(`₹${amount} के दान के लिए धन्यवाद! आपका योगदान ${impact} लोगों की मदद करेगा।\n\nआपका दान निम्नलिखित में मदद करेगा:\n• ${impact} लोगों को भोजन\n• ${Math.floor(amount/500)} बच्चों को कपड़े\n• ${Math.floor(amount/1000)} बच्चे की शिक्षा में सहायता`);
}

function setupMonthlyDonation() {
    const monthlyAmount = document.querySelector('input[name="monthly"]:checked')?.value;
    
    if (!monthlyAmount) {
        alert('कृपया मासिक राशि चुनें');
        return;
    }
    
    const monthlyImpact = Math.floor(monthlyAmount/100);
    alert(`₹${monthlyAmount}/माह के नियमित दान के लिए धन्यवाद!\n\nयह हर महीने ${monthlyImpact} लोगों की मदद करेगा।\nसाल भर में आप ${monthlyImpact * 12} लोगों की जिंदगी बदल सकेंगे।`);
}

// Contact form
function submitContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const helpType = formData.get('helpType');
    const message = formData.get('message');
    
    const helpTypes = {
        'food': 'भोजन सहायता',
        'clothing': 'कपड़े सहायता',
        'education': 'शिक्षा सहायता',
        'housing': 'आवास सहायता',
        'volunteer': 'स्वयंसेवक बनना',
        'other': 'अन्य'
    };
    
    let confirmMessage = `${name}, आपका संदेश प्राप्त हुआ!\n\n`;
    confirmMessage += `संपर्क जानकारी:\n`;
    confirmMessage += `ईमेल: ${email}\n`;
    if (phone) confirmMessage += `फोन: ${phone}\n`;
    if (helpType) confirmMessage += `सहायता का प्रकार: ${helpTypes[helpType]}\n`;
    confirmMessage += `\nसंदेश: ${message}\n\n`;
    confirmMessage += `हम जल्द ही आपसे संपर्क करेंगे।`;
    
    alert(confirmMessage);
    
    // Clear form
    event.target.reset();
}

// Modal functionality
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Initialize counter animations
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        let count = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                counter.textContent = target.toLocaleString() + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(count).toLocaleString() + '+';
            }
        }, 20);
    });
}

// Trigger counter animation when hero section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
});

// Additional utility functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#dc2626'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);