const rocks = document.querySelectorAll('.rock');
const selectedRockDisplay = document.getElementById('selected-rock-display');
const rockTypeInput = document.getElementById('rock-type');
const rockNumberInput = document.getElementById('rock-number');

const moneyInput = document.getElementById('money-input');
const clothingInput = document.getElementById('clothing-input');
const foodInput = document.getElementById('food-input');
const amountInput = document.getElementById('amount');
const clothingDetailsInput = document.getElementById('clothing-details');
const foodDetailsInput = document.getElementById('food-details');

function resetRockSelection() {
    rocks.forEach(rock => {
        rock.style.transform = 'translateY(0)';
        rock.style.boxShadow = '10px 10px 0 rgba(0, 0, 0, 0.1)';
        rock.style.borderWidth = '6px';
    });

    moneyInput.style.display = 'none';
    clothingInput.style.display = 'none';
    foodInput.style.display = 'none';

    amountInput.value = '';
    clothingDetailsInput.value = '';
    foodDetailsInput.value = '';
}

rocks.forEach(rock => {
    rock.addEventListener('click', () => {
        resetRockSelection();
      
        rock.style.transform = 'translateY(-20px) rotate(0deg)';
        rock.style.boxShadow = '20px 20px 0 rgba(0, 0, 0, 0.2)';
        rock.style.borderWidth = '8px';
    
        const rockNum = rock.getAttribute('data-rock');
        const rockType = rock.getAttribute('data-type');
        const rockTitle = rock.querySelector('h4').textContent;
        const rockIcon = rock.querySelector('.rock-icon').textContent;
        const rockTag = rock.querySelector('.rock-tag').textContent;
     
        rockTypeInput.value = rockType;
        rockNumberInput.value = rockNum;
    
        selectedRockDisplay.innerHTML = `
            <div class="rock-display-icon">${rockIcon}</div>
            <div class="rock-display-text">
                <strong>${rockTitle}</strong> - ${rockTag}
                <small>${rockType === 'money' ? 'Financial donation' : rockType + ' donation'}</small>
            </div>
        `;
       
        if (rockType === 'money') {
            moneyInput.style.display = 'block';
            amountInput.value = '10'; 
            amountInput.focus();
        } else if (rockType === 'clothing') {
            clothingInput.style.display = 'block';
            clothingDetailsInput.focus();
        } else if (rockType === 'food') {
            foodInput.style.display = 'block';
            foodDetailsInput.focus();
        }

        if (rockType === 'money') {
    document.getElementById('donation-amount').value = amountInput.value;
    document.getElementById('donation-details').value = 'Financial donation';
} else if (rockType === 'clothing') {
    document.getElementById('donation-details').value = clothingDetailsInput.value;
    document.getElementById('donation-amount').value = 'N/A';
} else if (rockType === 'food') {
    document.getElementById('donation-details').value = foodDetailsInput.value;
    document.getElementById('donation-amount').value = 'N/A';
}
document.getElementById('donation-type').value = rockType + ' (' + rockTitle + ')';
    });
});

document.getElementById('donation-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rockType = rockTypeInput.value;
    const rockNum = rockNumberInput.value;
    const notes = document.getElementById('notes').value;
 
    let donationDetails = '';
    
    if (rockType === 'money') {
        const amount = amountInput.value;
        if (!amount || amount < 10) {
            alert('Pebble Rock requires a minimum donation of $10.');
            return;
        }
        donationDetails = `$${amount} financial donation`;

        document.getElementById('donation-amount').value = amount;
        document.getElementById('donation-details').value = 'Financial donation';
    } else if (rockType === 'clothing') {
        const clothing = clothingDetailsInput.value;
        if (!clothing.trim()) {
            alert('Please describe the clothing items you are donating.');
            return;
        }
        donationDetails = `Clothing: ${clothing}`;

        document.getElementById('donation-details').value = clothing;
        document.getElementById('donation-amount').value = 'N/A';
    } else if (rockType === 'food') {
        const food = foodDetailsInput.value;
        if (!food.trim()) {
            alert('Please list the food items you are donating.');
            return;
        }
        donationDetails = `Food: ${food}`;

        document.getElementById('donation-details').value = food;
        document.getElementById('donation-amount').value = 'N/A';
    } else {
        alert('Please select a donation type first.');
        return;
    }

    const rockNames = {
        '1': 'Pebble Rock (Money)',
        '2': 'Boulder Rock (Clothing)',
        '3': 'Monument Rock (Food)'
    };
    document.getElementById('donation-type').value = rockNames[rockNum];

    alert(`Thank you, ${name}!\n\nDonation Type: ${rockNames[rockNum]}\nDetails: ${donationDetails}\n\nA confirmation email will be sent to ${email} with next steps for your donation.${notes ? `\n\nYour note: "${notes}"` : ''}`);
    alert('Submitting your donation to our records...');
    this.submit();
    setTimeout(() => {
        this.reset();
        resetRockSelection();
        selectedRockDisplay.innerHTML = `
            <div class="rock-display-icon">🪨</div>
            <div class="rock-display-text">
                <strong>No rock selected</strong>
                <small>Click a rock above to choose donation type</small>
            </div>
        `;
    }, 2000);
});

document.querySelector('.login-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Staff login portal will be available in Phase 2 of the system.');
});