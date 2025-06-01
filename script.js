const ERROR = 0.5;
let members = [];
let totalMembers = 0;
let minMeal = 0;

function setupMembers() {
  totalMembers = parseInt(document.getElementById("totalMembers").value);
  minMeal = parseInt(document.getElementById("minMeal").value);

  if (!totalMembers || totalMembers < 1 || !minMeal || minMeal < 1) {
    showError("Please enter valid numbers for members and minimum meals.");
    return;
  }

  if (totalMembers > 50) {
    showError("Maximum 50 members allowed.");
    return;
  }

  members = [];
  const memberCards = document.getElementById("memberCards");
  memberCards.innerHTML = "";

  for (let i = 0; i < totalMembers; i++) {
    const memberCard = document.createElement("div");
    memberCard.className = "member-card animate-fade-in";
    memberCard.innerHTML = `
                    <h3>Member ${i + 1}</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Name:</label>
                            <input type="text" id="name_${i}" placeholder="Enter member name" required>
                        </div>
                        <div class="form-group">
                            <label>Meal Expenses:</label>
                            <input type="number" id="mealExpenses_${i}" step="0.01" min="0" placeholder="0.00" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Grocery Expenses:</label>
                            <input type="number" id="groceryExpenses_${i}" step="0.01" min="0" placeholder="0.00" required>
                        </div>
                        <div class="form-group">
                            <label>Meal Count:</label>
                            <input type="number" id="mealCount_${i}" min="0" placeholder="0" required>
                        </div>
                    </div>
                `;
    memberCards.appendChild(memberCard);
  }

  document.getElementById("memberInputs").style.display = "block";
  document.getElementById("resultsSection").style.display = "none";
}

function calculateCharges() {
  // Show loading
  document.getElementById("calculateBtn").innerHTML =
    '<span class="loading"></span>Calculating...';

  setTimeout(() => {
    try {
      // Collect member data
      members = [];
      for (let i = 0; i < totalMembers; i++) {
        const name = document
          .getElementById(`name_${i}`)
          .value.trim()
          .toUpperCase();
        const mealExpenses =
          parseFloat(document.getElementById(`mealExpenses_${i}`).value) || 0;
        const groceryExpenses =
          parseFloat(document.getElementById(`groceryExpenses_${i}`).value) ||
          0;
        let mealCount =
          parseInt(document.getElementById(`mealCount_${i}`).value) || 0;

        if (!name) {
          throw new Error(`Please enter name for Member ${i + 1}`);
        }

        // Apply minimum meal rule (like adjust_meal_fine function)
        if (mealCount < minMeal) {
          mealCount = minMeal;
        }

        members.push({
          name: name,
          mealExpenses: mealExpenses,
          groceryExpenses: groceryExpenses,
          totalExpenses: mealExpenses + groceryExpenses,
          mealCount: mealCount,
          mealCharge: 0,
          groceryCharge: 0,
          totalCharge: 0,
          giveAndTake: 0,
        });
      }

      // Calculate totals (like expenses function)
      let totalMealExpenses = 0;
      let totalGroceryExpenses = 0;
      let totalMealCount = 0;

      members.forEach((member) => {
        totalMealExpenses += member.mealExpenses;
        totalGroceryExpenses += member.groceryExpenses;
        totalMealCount += member.mealCount;
      });

      const mealRate = totalMealExpenses / totalMealCount;
      const groceryRate = totalGroceryExpenses / totalMembers;

      // Calculate charges and give/take (like get_giver_and_taker function)
      let totalError = 0;
      let givers = [];
      let takers = [];

      members.forEach((member, index) => {
        member.mealCharge = member.mealCount * mealRate;
        member.groceryCharge = groceryRate;
        member.totalCharge = member.mealCharge + member.groceryCharge;
        member.giveAndTake = member.totalExpenses - member.totalCharge;
        totalError += member.giveAndTake;

        if (member.giveAndTake < 0) {
          givers.push({ index: index, amount: -member.giveAndTake });
        } else if (member.giveAndTake > 0) {
          takers.push({ index: index, amount: member.giveAndTake });
        }
      });

      totalError = Math.abs(totalError);

      // Display results
      displayResults(
        members,
        totalMealExpenses,
        totalGroceryExpenses,
        totalMealCount,
        mealRate,
        groceryRate,
        totalError
      );

      // Calculate and display transactions
      const transactions = calculateTransactions(givers, takers);
      displayTransactions(transactions);

      document.getElementById("resultsSection").style.display = "block";
      document
        .getElementById("resultsSection")
        .scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      showError(error.message);
    } finally {
      document.getElementById("calculateBtn").innerHTML = "Calculate Charges";
    }
  }, 500);
}

function calculateTransactions(givers, takers) {
  // Create deep copies to avoid modifying original arrays
  let giversCopy = givers.map((g) => ({ ...g }));
  let takersCopy = takers.map((t) => ({ ...t }));
  let transactions = [];

  // Sort by amount (descending) for better transaction optimization
  giversCopy.sort((a, b) => b.amount - a.amount);
  takersCopy.sort((a, b) => b.amount - a.amount);

  let gi = 0,
    ti = 0;

  while (gi < giversCopy.length && ti < takersCopy.length) {
    if (
      Math.abs(giversCopy[gi].amount) <= ERROR ||
      Math.abs(takersCopy[ti].amount) <= ERROR
    ) {
      if (Math.abs(giversCopy[gi].amount) <= ERROR) gi++;
      if (Math.abs(takersCopy[ti].amount) <= ERROR) ti++;
      continue;
    }

    const amount = Math.min(giversCopy[gi].amount, takersCopy[ti].amount);

    if (amount <= 0.01) break;

    transactions.push({
      from: members[giversCopy[gi].index].name,
      to: members[takersCopy[ti].index].name,
      amount: amount,
    });

    giversCopy[gi].amount -= amount;
    takersCopy[ti].amount -= amount;

    if (Math.abs(giversCopy[gi].amount) <= ERROR) gi++;
    if (Math.abs(takersCopy[ti].amount) <= ERROR) ti++;
  }

  return transactions;
}

function displayResults(
  members,
  totalMealExpenses,
  totalGroceryExpenses,
  totalMealCount,
  mealRate,
  groceryRate,
  totalError
) {
  // Display summary
  document.getElementById("summary").innerHTML = `
                <div class="summary-grid">
                    <div class="summary-item">
                        <div class="label">Total Meal Expenses</div>
                        <div class="value">₹${totalMealExpenses.toFixed(
    2
  )}</div>
                    </div>
                    <div class="summary-item">
                        <div class="label">Total Grocery Expenses</div>
                        <div class="value">₹${totalGroceryExpenses.toFixed(
    2
  )}</div>
                    </div>
                    <div class="summary-item">
                        <div class="label">Total Meal Count</div>
                        <div class="value">${totalMealCount}</div>
                    </div>
                    <div class="summary-item">
                        <div class="label">Meal Rate</div>
                        <div class="value">₹${mealRate.toFixed(2)}</div>
                    </div>
                    <div class="summary-item">
                        <div class="label">Grocery Rate</div>
                        <div class="value">₹${groceryRate.toFixed(2)}</div>
                    </div>
                    <div class="summary-item">
                        <div class="label">Calculation Error</div>
                        <div class="value">₹${totalError.toFixed(2)}</div>
                    </div>
                </div>
            `;

  // Display table
  const tbody = document.getElementById("resultsBody");
  tbody.innerHTML = "";

  members.forEach((member) => {
    const row = tbody.insertRow();
    row.innerHTML = `
                    <td><strong>${member.name}</strong></td>
                    <td>₹${member.mealExpenses.toFixed(2)}</td>
                    <td>₹${member.groceryExpenses.toFixed(2)}</td>
                    <td>${member.mealCount}</td>
                    <td>₹${member.mealCharge.toFixed(2)}</td>
                    <td>₹${member.groceryCharge.toFixed(2)}</td>
                    <td>₹${member.totalExpenses.toFixed(2)}</td>
                    <td>₹${member.totalCharge.toFixed(2)}</td>
                    <td style="color: ${member.giveAndTake >= 0 ? "#00b894" : "#d63031"
      }; font-weight: 600;">
                        ₹${member.giveAndTake.toFixed(2)}
                    </td>
                `;
  });
}

function displayTransactions(transactions) {
  const transactionList = document.getElementById("transactionList");

  if (transactions.length === 0) {
    transactionList.innerHTML =
      '<div class="success-message">✅ All accounts are settled! No transactions needed.</div>';
    return;
  }

  transactionList.innerHTML = "";
  transactions.forEach((transaction) => {
    const transactionItem = document.createElement("div");
    transactionItem.className = "transaction-item";
    transactionItem.innerHTML = `
                    <span><strong>${transaction.from
      }</strong> will pay <strong>${transaction.to
      }</strong></span>
                    <span class="transaction-amount">₹${transaction.amount.toFixed(
        2
      )}</span>
                `;
    transactionList.appendChild(transactionItem);
  });
}

function showError(message) {
  // Remove existing error messages
  const existingErrors = document.querySelectorAll(".error-message");
  existingErrors.forEach((error) => error.remove());

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;

  document
    .querySelector(".content")
    .insertBefore(errorDiv, document.querySelector(".form-section"));

  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// Add input validation
document.addEventListener("DOMContentLoaded", function () {
  // Add real-time validation for number inputs
  document.addEventListener("input", function (e) {
    if (e.target.type === "number") {
      if (e.target.value < 0) {
        e.target.value = 0;
      }
    }
  });
});
