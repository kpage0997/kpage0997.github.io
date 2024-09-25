/*
  Name: Kennedy Page
  Date: 09.25.2024
  CSC 372-01

  Description: This script provides interactive functionality for the meal plan page.
*/



document.addEventListener('DOMContentLoaded', () => {
    const addToPlanButtons = document.querySelectorAll('.add-to-plan');
    const mealPlanItems = document.getElementById('meal-plan-items');
    const totalCostElement = document.getElementById('total-cost');

    let mealPlan = [];
    let totalCost = 0;

    addToPlanButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dishName = button.getAttribute('data-name');
            const dishPrice = parseFloat(button.getAttribute('data-price'));

            // Check if the dish is already in the meal plan
            const existingDish = mealPlan.find(item => item.name === dishName);
            if (existingDish) {
                existingDish.quantity += 1;
            } else {
                mealPlan.push({ name: dishName, price: dishPrice, quantity: 1 });
            }
            totalCost += dishPrice;

            // Update meal plan display
            updateMealPlanDisplay();
        });
    });

    function updateMealPlanDisplay() {
        // Clear current items
        mealPlanItems.innerHTML = '';

        // Display each item in the meal plan
        mealPlan.forEach((dish, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('meal-plan-item');

            itemDiv.innerHTML = `
                <p>${dish.name} x${dish.quantity} - $${(dish.price * dish.quantity).toFixed(2)}</p>
                <div>
                    <button class="increase-quantity" data-index="${index}">+</button>
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <button class="remove-from-plan" data-index="${index}">Remove</button>
                </div>
            `;

            mealPlanItems.appendChild(itemDiv);
        });

        // Update total cost
        totalCostElement.textContent = totalCost.toFixed(2);

        // Add event listeners to the new buttons
        addMealPlanEventListeners();
    }

    function addMealPlanEventListeners() {
        const removeButtons = document.querySelectorAll('.remove-from-plan');
        const increaseButtons = document.querySelectorAll('.increase-quantity');
        const decreaseButtons = document.querySelectorAll('.decrease-quantity');

        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                totalCost -= mealPlan[index].price * mealPlan[index].quantity;
                mealPlan.splice(index, 1);
                updateMealPlanDisplay();
            });
        });

        increaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                mealPlan[index].quantity += 1;
                totalCost += mealPlan[index].price;
                updateMealPlanDisplay();
            });
        });

        decreaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                if (mealPlan[index].quantity > 1) {
                    mealPlan[index].quantity -= 1;
                    totalCost -= mealPlan[index].price;
                } else {
                    totalCost -= mealPlan[index].price;
                    mealPlan.splice(index, 1);
                }
                updateMealPlanDisplay();
            });
        });
    }
});