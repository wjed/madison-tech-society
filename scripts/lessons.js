// Lessons page functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchLessons');
    const topicFilter = document.getElementById('topicFilter');
    const lessonCards = document.querySelectorAll('.lesson-card');
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterLessons(searchTerm, topicFilter ? topicFilter.value : 'all');
        });
    }
    
    // Topic filter functionality
    if (topicFilter) {
        topicFilter.addEventListener('change', function() {
            const selectedTopic = this.value;
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            filterLessons(searchTerm, selectedTopic);
        });
    }
    
    // Resource link interactions
    const resourceLinks = document.querySelectorAll('.resource-link');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const resourceType = this.textContent.trim();
            let message = '';
            
            if (resourceType.includes('Slides')) {
                message = 'Slides will be available after the lesson. Check back soon!';
            } else if (resourceType.includes('Recording')) {
                message = 'Recording will be uploaded within 24 hours of the lesson.';
            } else if (resourceType.includes('Code') || resourceType.includes('Examples')) {
                message = 'Code examples and starter projects will be shared via GitHub.';
            } else if (resourceType.includes('Exercises') || resourceType.includes('Practice')) {
                message = 'Practice exercises are available in our shared repository.';
            } else {
                message = 'Resource will be available soon. Stay tuned!';
            }
            
            showResourceMessage(message);
        });
    });
    
    function filterLessons(searchTerm, topic) {
        lessonCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.lesson-description').textContent.toLowerCase();
            const cardTopic = card.getAttribute('data-topic');
            
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesTopic = topic === 'all' || cardTopic === topic;
            
            if (matchesSearch && matchesTopic) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-in';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show "no results" message if no lessons match
        const visibleCards = Array.from(lessonCards).filter(card => 
            card.style.display !== 'none'
        );
        
        let noResultsMsg = document.querySelector('.no-results-message');
        
        if (visibleCards.length === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.innerHTML = `
                    <div style="text-align: center; padding: 3rem; color: #64748b;">
                        <h3>No lessons found</h3>
                        <p>Try adjusting your search terms or filter selection.</p>
                    </div>
                `;
                document.querySelector('.lessons-grid').appendChild(noResultsMsg);
            }
            noResultsMsg.style.display = 'block';
        } else {
            if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        }
    }
    
    function showResourceMessage(message) {
        // Create and show resource notification
        const notification = document.createElement('div');
        notification.className = 'resource-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">📚</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles for notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2563eb;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);
        
        // Manual close
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }
    
    // Add fade-in animation for lesson cards
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .lesson-card {
            animation: fadeIn 0.5s ease-out;
        }
        
        .no-results-message {
            grid-column: 1 / -1;
        }
    `;
    document.head.appendChild(style);
});