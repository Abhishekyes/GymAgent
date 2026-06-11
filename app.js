// Muscle Meal Coach - Application Logic

// Default Application State
const DEFAULT_STATE = {
  profile: {
    age: 27,
    weight: 76,
    height: "5'5\"",
    gymStart: 510, // 8:30 AM in minutes
    gymEnd: 630,   // 10:30 AM in minutes
    sleepStart: 0, // 12:00 AM (midnight) in minutes
    sleepEnd: 30,  // 12:30 AM in minutes
    proteinTarget: "160-180g",
    caloriesTarget: "2600-2800 kcal",
    waterTarget: "4-5 L",
    sleepTarget: "7.5-8.5 hrs",
    stepsTarget: "8,000-10,000"
  },
  absoluteTimes: {
    4: 840,  // Lunch: 2:00 PM
    5: 1020, // Evening Protein: 5:00 PM
    6: 1140, // Evening Whey: 7:00 PM
    7: 1260  // Dinner: 9:00 PM
  },
  reminders: [
    {
      id: 1,
      title: "Pre-Workout Meal",
      relativeTo: "gymStart",
      offsetMinutes: -75, // 7:15 AM
      food: [
        "1 banana",
        "1 tbsp peanut butter",
        "1 scoop pre-workout",
        "500ml water"
      ],
      recipe: "Eat banana. Take peanut butter directly or with bread. Mix pre-workout in 500ml water and drink 20–30 minutes before gym.",
      timeNeeded: "2 minutes",
      reason: "Banana gives fast energy. Peanut butter gives slow energy. Pre-workout helps focus, strength, and performance.",
      supplement: "Pre-workout",
      status: "Enabled",
      currentOption: null,
      options: null
    },
    {
      id: 2,
      title: "Post-Workout Shake",
      relativeTo: "gymEnd",
      offsetMinutes: 0, // 10:30 AM
      food: [
        "1 scoop whey protein",
        "5g creatine if available",
        "300ml water"
      ],
      recipe: "Add whey and creatine to shaker. Add water. Shake for 20 seconds.",
      timeNeeded: "1 minute",
      reason: "Fast protein helps recovery and muscle repair after training.",
      supplement: "Whey Protein, Creatine",
      status: "Enabled",
      currentOption: null,
      options: null
    },
    {
      id: 3,
      title: "Main Muscle Meal",
      relativeTo: "gymEnd",
      offsetMinutes: 30, // 11:00 AM
      food: [
        "80g oats",
        "250ml milk",
        "1 tbsp peanut butter",
        "8 eggs",
        "200g dahi"
      ],
      recipe: "Oats: Add oats and milk to a pan. Cook for 4–5 minutes. Add peanut butter after cooking and mix. Eggs: Boil eggs for 10–12 minutes OR make omelette with onion, tomato, green chilli, and minimal oil.",
      timeNeeded: "15 minutes",
      reason: "This is the biggest recovery meal after gym. It gives protein, carbs, fats, and calories for muscle growth.",
      supplement: "None",
      status: "Enabled",
      currentOption: null,
      options: null
    },
    {
      id: 4,
      title: "Lunch",
      relativeTo: "absolute",
      food: [
        "3 roti",
        "1 bowl dal",
        "1 bowl sabzi",
        "Salad: cucumber, onion, tomato, lemon",
        "Fish oil",
        "Multivitamin"
      ],
      recipe: "Prepare dal with turmeric, salt, jeera, and pressure cook for 3 whistles. Make fresh salad with lemon and salt. Eat salad first, then dal, roti, and sabzi.",
      timeNeeded: "20 minutes",
      reason: "Lunch gives steady carbs, plant protein, fiber, and micronutrients for recovery.",
      supplement: "Fish Oil, Multivitamin",
      status: "Enabled",
      currentOption: null,
      options: null
    },
    {
      id: 5,
      title: "Evening Protein Meal",
      relativeTo: "absolute",
      options: {
        A: {
          name: "Paneer Bhurji",
          food: ["150g paneer", "Cucumber"],
          recipe: "Make paneer bhurji. Lightly sauté onion and tomato. Add crumbled paneer. Cook for 5 minutes.",
          timeNeeded: "10 minutes"
        },
        B: {
          name: "Soybean Salad",
          food: ["50g dry soybean, soaked and boiled", "Cucumber"],
          recipe: "Soak soybean overnight. Pressure cook. Add salt and lemon.",
          timeNeeded: "10 minutes"
        },
        C: {
          name: "Eggs Option",
          food: ["6 Egg whites OR 4 whole eggs", "Cucumber"],
          recipe: "Boil eggs for 10-12 mins OR make scrambled eggs with minimal oil.",
          timeNeeded: "8 minutes"
        }
      },
      currentOption: "A",
      reason: "This keeps protein intake high and supports muscle protein synthesis.",
      supplement: "None",
      status: "Enabled"
    },
    {
      id: 6,
      title: "Evening Whey Meal",
      relativeTo: "absolute",
      food: [
        "1 scoop whey protein",
        "1 banana"
      ],
      recipe: "Mix whey with water. Eat banana.",
      timeNeeded: "1 minute",
      reason: "This keeps protein intake high and adds carbs for recovery.",
      supplement: "Whey Protein",
      status: "Enabled",
      currentOption: null,
      options: null
    },
    {
      id: 7,
      title: "Dinner",
      relativeTo: "absolute",
      options: {
        A: {
          name: "Chicken or Fish",
          food: ["200g chicken or fish", "Sabzi", "Salad"],
          recipe: "Marinate chicken/fish with salt, pepper, turmeric, lemon. Grill, air-fry, or pan-cook with minimal oil for 15–20 minutes.",
          timeNeeded: "20 minutes"
        },
        B: {
          name: "Paneer Dinner",
          food: ["250g paneer", "Sabzi", "Salad"],
          recipe: "Lightly sauté paneer with basic spices for 5–7 minutes.",
          timeNeeded: "10 minutes"
        }
      },
      currentOption: "A",
      reason: "High-protein dinner supports overnight muscle repair and recovery.",
      supplement: "None",
      status: "Enabled"
    },
    {
      id: 8,
      title: "Sleep Recovery Meal",
      relativeTo: "sleepStart",
      offsetMinutes: -90, // 10:30 PM (for 12:00 AM)
      food: [
        "200g dahi",
        "ZMA"
      ],
      recipe: "Eat dahi. Take ZMA with water. If ZMA label says avoid calcium, take ZMA separately closer to sleep.",
      timeNeeded: "1 minute",
      reason: "Supports sleep and recovery.",
      supplement: "ZMA",
      status: "Enabled",
      currentOption: null,
      options: null
    },
    {
      id: 9,
      title: "Final Small Meal",
      relativeTo: "sleepStart",
      offsetMinutes: -15, // 11:45 PM
      food: [
        "1 tbsp peanut butter",
        "Water"
      ],
      recipe: "Take peanut butter directly or with 1 slice bread if hungry.",
      timeNeeded: "1 minute",
      reason: "Slow-digesting fats help control hunger before sleep.",
      supplement: "None",
      status: "Enabled",
      currentOption: null,
      options: null
    }
  ]
};

// Global App State loaded from LocalStorage or Default
let state = JSON.parse(localStorage.getItem("muscle_meal_state")) || JSON.parse(JSON.stringify(DEFAULT_STATE));

// Save state to LocalStorage
function saveState() {
  localStorage.setItem("muscle_meal_state", JSON.stringify(state));
}

// ----------------------------------------------------
// TIME HELPER FUNCTIONS
// ----------------------------------------------------

// Parse "HH:MM" (24h) or "HH:MM AM/PM" into minutes from midnight
function parseTimeToMinutes(timeStr) {
  if (!timeStr) return null;
  timeStr = timeStr.trim().toUpperCase();
  
  // Format: 12:30 AM or 8:30 PM
  const ampmMatch = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);
  if (ampmMatch) {
    let hrs = parseInt(ampmMatch[1]);
    let mins = parseInt(ampmMatch[2]);
    const ampm = ampmMatch[3];
    if (ampm === "PM" && hrs < 12) hrs += 12;
    if (ampm === "AM" && hrs === 12) hrs = 0;
    return hrs * 60 + mins;
  }
  
  // Format: 23:30 or 08:30
  const militaryMatch = timeStr.match(/^(\d{1,2}):(\d{2})$/);
  if (militaryMatch) {
    let hrs = parseInt(militaryMatch[1]);
    let mins = parseInt(militaryMatch[2]);
    return hrs * 60 + mins;
  }

  // Format: 8 AM or 9 PM
  const simpleAmPmMatch = timeStr.match(/^(\d{1,2})\s*(AM|PM)$/);
  if (simpleAmPmMatch) {
    let hrs = parseInt(simpleAmPmMatch[1]);
    const ampm = simpleAmPmMatch[2];
    if (ampm === "PM" && hrs < 12) hrs += 12;
    if (ampm === "AM" && hrs === 12) hrs = 0;
    return hrs * 60;
  }

  return null;
}

// Format minutes from midnight to "HH:MM AM/PM"
function formatMinutesToAmPm(minutes) {
  minutes = (minutes + 1440) % 1440;
  let hrs = Math.floor(minutes / 60);
  let mins = minutes % 60;
  const ampm = hrs >= 12 ? "PM" : "AM";
  hrs = hrs % 12;
  if (hrs === 0) hrs = 12;
  const minsStr = mins < 10 ? "0" + mins : mins;
  return `${hrs}:${minsStr} ${ampm}`;
}

// Format minutes from midnight to "HH:MM" (24h format for inputs)
function formatMinutesTo24h(minutes) {
  minutes = (minutes + 1440) % 1440;
  let hrs = Math.floor(minutes / 60);
  let mins = minutes % 60;
  const hrsStr = hrs < 10 ? "0" + hrs : hrs;
  const minsStr = mins < 10 ? "0" + mins : mins;
  return `${hrsStr}:${minsStr}`;
}

// Get meal time and notification time (1h before) for a reminder
function getReminderTimes(reminder) {
  let mealMinutes;
  if (reminder.relativeTo === "gymStart") {
    mealMinutes = state.profile.gymStart + reminder.offsetMinutes;
  } else if (reminder.relativeTo === "gymEnd") {
    mealMinutes = state.profile.gymEnd + reminder.offsetMinutes;
  } else if (reminder.relativeTo === "sleepStart") {
    mealMinutes = state.profile.sleepStart + reminder.offsetMinutes;
  } else {
    // absolute meal time
    mealMinutes = state.absoluteTimes[reminder.id];
  }
  
  mealMinutes = (mealMinutes + 1440) % 1440;
  let notifyMinutes = (mealMinutes - 60 + 1440) % 1440;
  
  return {
    mealStr: formatMinutesToAmPm(mealMinutes),
    notifyStr: formatMinutesToAmPm(notifyMinutes),
    mealMinutes,
    notifyMinutes
  };
}

// ----------------------------------------------------
// UI RENDERING FUNCTIONS
// ----------------------------------------------------

// Render targets indicators
function renderMetrics() {
  document.getElementById("val-calories").innerHTML = `${state.profile.caloriesTarget.replace(" kcal", "")} <span>kcal</span>`;
  document.getElementById("val-protein").innerHTML = `${state.profile.proteinTarget.replace("g", "")} <span>g</span>`;
  
  const gymStartStr = formatMinutesToAmPm(state.profile.gymStart);
  const gymEndStr = formatMinutesToAmPm(state.profile.gymEnd);
  document.getElementById("val-gym").innerHTML = `${gymStartStr.replace(" AM","").replace(" PM","")} - ${gymEndStr}`;
  
  const sleepStartStr = formatMinutesToAmPm(state.profile.sleepStart);
  const sleepEndStr = formatMinutesToAmPm(state.profile.sleepEnd);
  document.getElementById("val-sleep").innerHTML = `${sleepStartStr.replace(" AM","").replace(" PM","")} - ${sleepEndStr}`;
}

// Render schedule cards
function renderReminders() {
  const container = document.getElementById("reminders-grid-box");
  container.innerHTML = "";

  state.reminders.forEach(reminder => {
    const times = getReminderTimes(reminder);
    const isEnabled = reminder.status === "Enabled";
    
    // Resolve food, recipe, and timeNeeded based on options if present
    let foodList = reminder.food;
    let recipeStr = reminder.recipe;
    let duration = reminder.timeNeeded;
    
    if (reminder.options) {
      const activeOpt = reminder.options[reminder.currentOption];
      foodList = activeOpt.food;
      recipeStr = activeOpt.recipe;
      duration = activeOpt.timeNeeded;
    }

    const card = document.createElement("div");
    card.className = `reminder-card ${isEnabled ? "" : "disabled"}`;
    card.id = `reminder-card-${reminder.id}`;

    // Options UI HTML
    let optionsHtml = "";
    if (reminder.options) {
      optionsHtml = `<div class="options-toggle-group">`;
      Object.keys(reminder.options).forEach(optKey => {
        const isCurrent = reminder.currentOption === optKey;
        optionsHtml += `
          <button class="opt-btn ${isCurrent ? "active" : ""}" onclick="switchOption(${reminder.id}, '${optKey}')">
            ${reminder.options[optKey].name}
          </button>
        `;
      });
      optionsHtml += `</div>`;
    }

    // Food Items UI list
    let foodItemsHtml = "";
    foodList.forEach(item => {
      foodItemsHtml += `<li>${item}</li>`;
    });

    card.innerHTML = `
      <div class="reminder-card-header">
        <div class="reminder-title-box">
          <div class="reminder-time-badge">Meal: ${times.mealStr} | Alert: ${times.notifyStr}</div>
          <h3 class="reminder-title">#${reminder.id} ${reminder.title}</h3>
        </div>
        <label class="switch">
          <input type="checkbox" ${isEnabled ? "checked" : ""} onchange="toggleReminderStatus(${reminder.id}, this.checked)">
          <span class="slider"></span>
        </label>
      </div>

      <div class="reminder-meta">
        <div class="meta-item">⏱️ ${duration} prep</div>
        <div class="meta-item">💊 Supp: ${reminder.supplement || "None"}</div>
      </div>

      <div class="reminder-food-section">
        <span class="food-title">Ingredients:</span>
        <ul class="food-list">
          ${foodItemsHtml}
        </ul>
        ${optionsHtml}
      </div>

      <div class="reminder-recipe-section">
        <div class="recipe-title">Instructions:</div>
        <div class="recipe-text">${recipeStr}</div>
      </div>

      <div class="reminder-reason">
        🎯 <strong>Why:</strong> ${reminder.reason}
      </div>

      <div class="reminder-actions">
        <button class="card-action-btn" onclick="copyAlertText(${reminder.id})">
          📋 Alert Msg
        </button>
        <button class="card-action-btn" onclick="copyRecipeText(${reminder.id})">
          🍳 Recipe
        </button>
      </div>
    `;

    container.appendChild(card);
  });
  
  // Render summary table
  renderTable();
}

// Render dynamic schedule summary table
function renderTable() {
  const tableBody = document.getElementById("schedule-table-body");
  if (!tableBody) return;
  tableBody.innerHTML = "";
  
  state.reminders.forEach(reminder => {
    const times = getReminderTimes(reminder);
    const isEnabled = reminder.status === "Enabled";
    
    let foodList = reminder.food;
    if (reminder.options) {
      foodList = reminder.options[reminder.currentOption].food;
    }
    
    // Prefix food item with emoji for table aesthetics
    let foodPrefixStr = "";
    if (reminder.id === 1) foodPrefixStr = "🍌 " + foodList[0] + " + 🥜 " + foodList[1] + " + " + foodList[2] + " + " + foodList[3];
    else if (reminder.id === 2) foodPrefixStr = "🥤 " + foodList[0] + " + " + foodList[1];
    else if (reminder.id === 3) foodPrefixStr = "🥣 " + foodList[0] + " + " + foodList[1] + " + " + foodList[2] + " + 🥚 " + foodList[3] + " + " + foodList[4];
    else if (reminder.id === 4) foodPrefixStr = "🍽️ " + foodList[0] + " + " + foodList[1] + " + " + foodList[2] + " + " + foodList[3] + " + " + foodList[4] + " + " + foodList[5];
    else if (reminder.id === 5) {
      const activeOpt = reminder.options[reminder.currentOption];
      if (reminder.currentOption === "A") {
        foodPrefixStr = "🧀 " + activeOpt.food[0] + " + " + activeOpt.food[1];
      } else if (reminder.currentOption === "C") {
        foodPrefixStr = "🥚 " + activeOpt.food[0] + " + " + activeOpt.food[1];
      } else {
        foodPrefixStr = "🌱 " + activeOpt.food[0] + " + " + activeOpt.food[1];
      }
    }
    else if (reminder.id === 6) foodPrefixStr = "🥤 " + foodList[0] + " + 🍌 " + foodList[1];
    else if (reminder.id === 7) {
      const activeOpt = reminder.options[reminder.currentOption];
      if (reminder.currentOption === "A") {
        foodPrefixStr = "🍗 " + activeOpt.food[0] + " + " + activeOpt.food[1] + " + " + activeOpt.food[2];
      } else {
        foodPrefixStr = "🧀 " + activeOpt.food[0] + " + " + activeOpt.food[1] + " + " + activeOpt.food[2];
      }
    }
    else if (reminder.id === 8) foodPrefixStr = "🥣 " + foodList[0] + " + " + foodList[1];
    else if (reminder.id === 9) foodPrefixStr = "🥜 " + foodList[0] + " + " + foodList[1];

    const tr = document.createElement("tr");
    if (!isEnabled) {
      tr.style.opacity = "0.4";
      tr.style.textDecoration = "line-through";
    }
    
    tr.innerHTML = `
      <td><strong>${times.notifyStr}</strong></td>
      <td><strong>${times.mealStr}</strong></td>
      <td>${foodPrefixStr}</td>
    `;
    tableBody.appendChild(tr);
  });
  
  // Add sleep row
  const sleepStartStr = formatMinutesToAmPm(state.profile.sleepStart);
  const sleepEndStr = formatMinutesToAmPm(state.profile.sleepEnd);
  
  const trSleep = document.createElement("tr");
  trSleep.innerHTML = `
    <td><strong>${sleepStartStr}–${sleepEndStr}</strong></td>
    <td>Sleep</td>
    <td>😴 7.5–8.5 Hours of Recovery</td>
  `;
  tableBody.appendChild(trSleep);
}

// Copy markdown table
function copyMarkdownTable() {
  let tableMarkdown = `| Reminder | Eat Time | Meal |\n| --- | --- | --- |\n`;
  state.reminders.forEach(reminder => {
    const times = getReminderTimes(reminder);
    let foodList = reminder.food;
    if (reminder.options) {
      foodList = reminder.options[reminder.currentOption].food;
    }
    
    let foodText = foodList.join(" + ");
    if (reminder.id === 1) foodText = `🍌 1 Banana + 🥜 1 tbsp Peanut Butter + Pre-Workout + 500ml Water`;
    else if (reminder.id === 2) foodText = `🥤 1 Scoop Whey + 5g Creatine`;
    else if (reminder.id === 3) foodText = `🥣 80g Oats + 250ml Milk + 1 tbsp Peanut Butter + 🥚 8 Eggs + 200g Dahi`;
    else if (reminder.id === 4) foodText = `🍽️ 3 Roti + 1 Bowl Dal + Sabzi + Salad + Fish Oil + Multivitamin`;
    else if (reminder.id === 5) {
      if (reminder.currentOption === "A") foodText = `🧀 150g Paneer Bhurji + Cucumber`;
      else if (reminder.currentOption === "C") foodText = `🥚 Eggs Option + Cucumber`;
      else foodText = `🌱 50g Soybean + Cucumber`;
    }
    else if (reminder.id === 6) foodText = `🥤 1 Scoop Whey + 🍌 1 Banana`;
    else if (reminder.id === 7) {
      if (reminder.currentOption === "A") foodText = `🍗 200g Chicken/Fish + Sabzi + Salad`;
      else foodText = `🧀 250g Paneer + Sabzi + Salad`;
    }
    else if (reminder.id === 8) foodText = `🥣 200g Dahi + ZMA`;
    else if (reminder.id === 9) foodText = `🥜 1 tbsp Peanut Butter + Water`;

    const statusMark = reminder.status === "Enabled" ? "" : " *(Disabled)*";
    tableMarkdown += `| **${times.notifyStr}** | **${times.mealStr}** | ${foodText}${statusMark} |\n`;
  });
  
  const sleepStartStr = formatMinutesToAmPm(state.profile.sleepStart);
  const sleepEndStr = formatMinutesToAmPm(state.profile.sleepEnd);
  tableMarkdown += `| **${sleepStartStr}–${sleepEndStr}** | Sleep | 😴 7.5–8.5 Hours |\n`;
  
  navigator.clipboard.writeText(tableMarkdown).then(() => {
    showToast("Markdown Table Copied!");
  });
}

// ----------------------------------------------------
// STATE MODIFIERS AND TOGGLES
// ----------------------------------------------------

window.toggleReminderStatus = function(id, isChecked) {
  const reminder = state.reminders.find(r => r.id === id);
  if (reminder) {
    reminder.status = isChecked ? "Enabled" : "Disabled";
    saveState();
    renderReminders();
    showToast(`Reminder "${reminder.title}" ${isChecked ? "Enabled" : "Disabled"}`);
    
    // Add coach comment to log
    addCoachMessage(`Status check: **${reminder.title}** is now **${reminder.status}**. Keep staying disciplined!`);
  }
};

window.switchOption = function(reminderId, optionKey) {
  const reminder = state.reminders.find(r => r.id === reminderId);
  if (reminder && reminder.options && reminder.options[optionKey]) {
    reminder.currentOption = optionKey;
    saveState();
    renderReminders();
    showToast(`Swapped to ${reminder.options[optionKey].name}`);
    addCoachMessage(`Protein swap executed. Lunch/Dinner configured to **${reminder.options[optionKey].name}** to match targets.`);
  }
};

// Toast indicator
function showToast(message) {
  const toast = document.getElementById("toast-message");
  toast.innerText = message;
  toast.className = "toast show";
  setTimeout(() => {
    toast.className = "toast";
  }, 2500);
}

// Copy Action
window.copyAlertText = function(id) {
  const reminder = state.reminders.find(r => r.id === id);
  if (reminder) {
    const times = getReminderTimes(reminder);
    let foodList = reminder.food;
    if (reminder.options) {
      foodList = reminder.options[reminder.currentOption].food;
    }
    const cleanFood = foodList.join(", ");
    
    const text = `🔔 MUSCLE MEAL COACH Alert!\nMeal: ${reminder.title}\nTime: ${times.mealStr}\nEat: ${cleanFood}\nReason: ${reminder.reason}`;
    
    navigator.clipboard.writeText(text).then(() => {
      showToast("Notification Alert Copied!");
    });
  }
};

window.copyRecipeText = function(id) {
  const reminder = state.reminders.find(r => r.id === id);
  if (reminder) {
    let recipeStr = reminder.recipe;
    if (reminder.options) {
      recipeStr = reminder.options[reminder.currentOption].recipe;
    }
    navigator.clipboard.writeText(recipeStr).then(() => {
      showToast("Cooking Recipe Copied!");
    });
  }
};

// ----------------------------------------------------
// NATURAL LANGUAGE COMMAND INTERPRETER (NLP ENGINE)
// ----------------------------------------------------

function addCoachMessage(text) {
  const box = document.getElementById("chat-messages-box");
  const msgDiv = document.createElement("div");
  msgDiv.className = "message coach";
  msgDiv.innerHTML = text.replace(/\n/g, "<br>");
  
  const timeSpan = document.createElement("span");
  timeSpan.className = "message-time";
  timeSpan.innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  msgDiv.appendChild(timeSpan);
  
  box.appendChild(msgDiv);
  box.scrollTop = box.scrollHeight;
}

function addUserMessage(text) {
  const box = document.getElementById("chat-messages-box");
  const msgDiv = document.createElement("div");
  msgDiv.className = "message user";
  msgDiv.innerText = text;
  
  const timeSpan = document.createElement("span");
  timeSpan.className = "message-time";
  timeSpan.innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  msgDiv.appendChild(timeSpan);
  
  box.appendChild(msgDiv);
  box.scrollTop = box.scrollHeight;
}

function processCommand(rawCommand) {
  const cmd = rawCommand.toLowerCase().trim();
  
  // 1. Help / Info Setup
  if (cmd === "production simple setup" || cmd === "setup" || cmd === "help") {
    document.getElementById("modal-setup").classList.add("active");
    addCoachMessage(`📋 **Production setup guidelines opened!**\nUse Google Calendar ICS file for automatic synchronization, or copy Todoist formats below. Stay focused!`);
    return;
  }
  
  // 2. Weekly Shopping List
  if (cmd.includes("shopping list") || cmd === "shopping") {
    openShoppingList();
    addCoachMessage(`🛒 **Weekly Shopping List loaded!** Buy fresh, stock up, and do not miss any meals. Consistency is key!`);
    return;
  }
  
  // 3. Apple Reminder / Todoist Schedule Creation
  if (cmd.includes("apple reminder") || cmd.includes("todoist") || cmd.includes("create reminder list") || cmd === "create reminders") {
    let textOut = `💪 **MUSCLE MEAL COACH - DAILY PLAN**\n\n`;
    state.reminders.forEach(r => {
      if (r.status === "Enabled") {
        const times = getReminderTimes(r);
        let foods = r.food;
        if (r.options) foods = r.options[r.currentOption].food;
        textOut += `Title: ${r.title}\nTime: ${times.mealStr} (Alert: ${times.notifyStr})\nRepeat: Every Day\nNotification text: Eat ${foods.join(", ")}.\nRecipe: ${r.options ? r.options[r.currentOption].recipe : r.recipe}\nTime needed: ${r.options ? r.options[r.currentOption].timeNeeded : r.timeNeeded}\nReason: ${r.reason}\n\n`;
      }
    });
    
    addCoachMessage(`📋 **Here is your daily Reminders list output:**\n\n${textOut}\n\n*Copy this list directly into your notes or automation app.*`);
    return;
  }
  
  // 4. Google Calendar Schedule Command
  if (cmd.includes("google calendar schedule") || cmd.includes("google calendar")) {
    addCoachMessage(`📅 **Google Calendar setup ready!**\nUse the **Download ICS Calendar** button at the top header to save your schedule file, then import it directly inside Google Calendar. Let's make it automated!`);
    return;
  }

  // 5. Replace chicken with paneer
  if (cmd.includes("replace chicken with paneer")) {
    const r7 = state.reminders.find(r => r.id === 7);
    if (r7) {
      r7.currentOption = "B";
      saveState();
      renderReminders();
      addCoachMessage(`🍗 ➔ 🧀 **Dinner updated to Paneer Sauté!** Replaced chicken to match veg constraints. Target macros adjusted.`);
      return;
    }
  }

  // 6. Replace paneer with eggs
  if (cmd.includes("replace paneer with eggs")) {
    const r5 = state.reminders.find(r => r.id === 5);
    if (r5) {
      r5.currentOption = "C"; // Eggs option
      saveState();
      renderReminders();
      addCoachMessage(`🧀 ➔ 🥚 **Evening Protein Meal updated to Eggs!** Sautéed paneer replaced with egg whites/whole eggs. High biological value!`);
      return;
    }
  }

  // 7. Replace eggs with paneer (Revert)
  if (cmd.includes("replace eggs with paneer")) {
    const r5 = state.reminders.find(r => r.id === 5);
    if (r5) {
      r5.currentOption = "A";
      saveState();
      renderReminders();
      addCoachMessage(`🥚 ➔ 🧀 **Evening Protein Meal restored to Paneer Bhurji!** High quality slow-digesting protein.`);
      return;
    }
  }

  // 8. Replace paneer with chicken (Revert Dinner)
  if (cmd.includes("replace paneer with chicken") || cmd.includes("replace paneer with fish")) {
    const r7 = state.reminders.find(r => r.id === 7);
    if (r7) {
      r7.currentOption = "A";
      saveState();
      renderReminders();
      addCoachMessage(`🧀 ➔ 🍗 **Dinner restored to Chicken/Fish!** High protein payload for overnight recovery.`);
      return;
    }
  }

  // 9. Disable specific reminders
  const disableMatch = cmd.match(/disable\s+(?:reminder\s+(\d+)|([a-z0-9\s-]+)\s+reminder|[a-z0-9\s-]+)/);
  if (disableMatch && cmd.startsWith("disable")) {
    let foundReminder = null;
    if (disableMatch[1]) {
      const idx = parseInt(disableMatch[1]);
      foundReminder = state.reminders.find(r => r.id === idx);
    } else {
      const namePart = (disableMatch[2] || cmd.replace("disable", "")).trim();
      foundReminder = state.reminders.find(r => r.title.toLowerCase().includes(namePart) || namePart.includes(r.title.toLowerCase()));
    }
    
    if (foundReminder) {
      foundReminder.status = "Disabled";
      saveState();
      renderReminders();
      addCoachMessage(`🚫 **${foundReminder.title}** has been **Disabled**. Make sure you compensate for these nutrients in other meals!`);
      return;
    }
  }

  // 10. Enable specific reminders
  const enableMatch = cmd.match(/enable\s+(?:reminder\s+(\d+)|([a-z0-9\s-]+)\s+reminder|[a-z0-9\s-]+)/);
  if (enableMatch && cmd.startsWith("enable")) {
    let foundReminder = null;
    if (enableMatch[1]) {
      const idx = parseInt(enableMatch[1]);
      foundReminder = state.reminders.find(r => r.id === idx);
    } else {
      const namePart = (enableMatch[2] || cmd.replace("enable", "")).trim();
      foundReminder = state.reminders.find(r => r.title.toLowerCase().includes(namePart) || namePart.includes(r.title.toLowerCase()));
    }
    
    if (foundReminder) {
      foundReminder.status = "Enabled";
      saveState();
      renderReminders();
      addCoachMessage(`✅ **${foundReminder.title}** has been **Enabled**. Back on track! Let's get it.`);
      return;
    }
  }

  // 11. Change Gym Time
  if (cmd.includes("change gym time") || cmd.includes("change gym")) {
    const timeRegex = /(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i;
    const match = cmd.match(timeRegex);
    if (match) {
      const newMinutes = parseTimeToMinutes(match[1]);
      if (newMinutes !== null) {
        state.profile.gymStart = newMinutes;
        state.profile.gymEnd = newMinutes + 120; // Default 2 hours workout
        saveState();
        renderMetrics();
        renderReminders();
        addCoachMessage(`🏋️ **Gym schedule updated!**\nNew window: **${formatMinutesToAmPm(state.profile.gymStart)} - ${formatMinutesToAmPm(state.profile.gymEnd)}**.\nPre-workout (#1) and Post-workout (#2, #3) meal times updated automatically to maintain performance window.`);
        return;
      }
    }
  }

  // 12. Change Sleep Time
  if (cmd.includes("change sleep time") || cmd.includes("change sleep")) {
    const timeRegex = /(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i;
    const match = cmd.match(timeRegex);
    if (match) {
      const newMinutes = parseTimeToMinutes(match[1]);
      if (newMinutes !== null) {
        state.profile.sleepStart = newMinutes;
        state.profile.sleepEnd = (newMinutes + 30) % 1440;
        saveState();
        renderMetrics();
        renderReminders();
        addCoachMessage(`🌙 **Sleep schedule updated!**\nBedtime: **${formatMinutesToAmPm(state.profile.sleepStart)}**.\nSleep recovery meals (#8 and #9) times adjusted to ensure maximum overnight recovery.`);
        return;
      }
    }
  }

  // 13. Change specific meal time (E.g. "change meal 4 to 3:00 PM")
  if (cmd.includes("change meal")) {
    const mealNumMatch = cmd.match(/meal\s*(\d+)/i);
    const timeMatch = cmd.match(/(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i);
    
    if (mealNumMatch && timeMatch) {
      const mealId = parseInt(mealNumMatch[1]);
      const newMinutes = parseTimeToMinutes(timeMatch[1]);
      
      const r = state.reminders.find(rem => rem.id === mealId);
      if (r && newMinutes !== null) {
        if (r.relativeTo === "absolute") {
          state.absoluteTimes[mealId] = newMinutes;
        } else {
          // If it was relative, convert it to absolute to pin it
          r.relativeTo = "absolute";
          state.absoluteTimes[mealId] = newMinutes;
        }
        saveState();
        renderReminders();
        addCoachMessage(`⏰ **Meal #${mealId} (${r.title})** rescheduled to **${formatMinutesToAmPm(newMinutes)}**.\nNotification is set 1 hour before (**${formatMinutesToAmPm(newMinutes - 60)}**).`);
        return;
      }
    }
  }

  // Default fallback if query not explicitly caught
  addCoachMessage(`💪 Agent Name: **MUSCLE MEAL COACH**\nCommand not recognized. Try typing:\n- \`disable evening whey reminder\`\n- \`change gym time to 9:00 AM\`\n- \`replace chicken with paneer\`\n- \`create reminders\`\n- \`shopping list\``);
}

// ----------------------------------------------------
// SHOPPING LIST COMPILER
// ----------------------------------------------------

function openShoppingList() {
  const listBox = document.getElementById("shopping-list-items");
  listBox.innerHTML = "";
  
  // Collect all base ingredients
  const ingredients = new Set([
    "Oats (1 packet - 1kg)",
    "Milk (2.5 Liters)",
    "Dahi (1.5 kg)",
    "Bananas (1-2 Dozens)",
    "Peanut butter (1 jar - 500g)",
    "Dal (Jeera, Turmeric, Salt)",
    "Wheat flour (Roti prep)",
    "Salad vegetables (Cucumbers, Tomatoes, Onions, Lemons)"
  ]);
  
  // Conditional protein sources depending on option selection
  const r5 = state.reminders.find(r => r.id === 5);
  const r7 = state.reminders.find(r => r.id === 7);
  
  if (r5.currentOption === "A" || r7.currentOption === "B") {
    ingredients.add("Paneer (Fresh) - 1.5kg to 2.5kg");
  }
  if (r5.currentOption === "C") {
    ingredients.add("Eggs (Organic) - 3 Dozens");
  }
  if (r5.currentOption === "B") {
    ingredients.add("Dry Soybean chunks - 500g");
  }
  if (r7.currentOption === "A") {
    ingredients.add("Chicken Breast / Fish fillets - 1.5kg");
  }
  
  // Add Eggs as default since Reminder 3 uses 8 eggs daily (56 eggs/week!)
  ingredients.add("Eggs (Organic) - 5 to 6 Dozens (For post-gym meal)");

  ingredients.forEach(item => {
    const li = document.createElement("li");
    li.style.padding = "0.5rem 0";
    li.style.borderBottom = "1px solid var(--border-color)";
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.gap = "0.5rem";
    li.innerHTML = `<input type="checkbox" style="accent-color: var(--accent);"> <span>${item}</span>`;
    listBox.appendChild(li);
  });
  
  document.getElementById("modal-shopping").classList.add("active");
}

// ----------------------------------------------------
// ICS CALENDAR GENERATOR (.ics file)
// ----------------------------------------------------

function downloadICSFile() {
  let icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Muscle Meal Coach//NONSGML Diet Reminders//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH"
  ];
  
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  state.reminders.forEach(reminder => {
    if (reminder.status !== "Enabled") return;
    
    const times = getReminderTimes(reminder);
    const mealHr = Math.floor(times.mealMinutes / 60);
    const mealMin = times.mealMinutes % 60;
    
    const mealHrStr = String(mealHr).padStart(2, '0');
    const mealMinStr = String(mealMin).padStart(2, '0');
    
    let foodList = reminder.food;
    let recipeStr = reminder.recipe;
    if (reminder.options) {
      const opt = reminder.options[reminder.currentOption];
      foodList = opt.food;
      recipeStr = opt.recipe;
    }
    
    const description = `Meal: ${reminder.title}\\n` +
                        `Time: ${times.mealStr}\\n` +
                        `Ingredients:\\n- ${foodList.join('\\n- ')}\\n\\n` +
                        `Recipe:\\n${recipeStr}\\n\\n` +
                        `Why: ${reminder.reason}`;
    
    const cleanDesc = description.replace(/,/g, '\\,').replace(/;/g, '\\;');
    
    icsLines.push("BEGIN:VEVENT");
    icsLines.push(`UID:muscle_meal_reminder_${reminder.id}@musclemealcoach.com`);
    icsLines.push(`DTSTAMP:${year}${month}${day}T120000Z`);
    // Schedule today at the meal time
    icsLines.push(`DTSTART;TZID=Asia/Kolkata:${year}${month}${day}T${mealHrStr}${mealMinStr}00`);
    icsLines.push(`DTEND;TZID=Asia/Kolkata:${year}${month}${day}T${mealHrStr}${mealMinStr}00`);
    icsLines.push("RRULE:FREQ=DAILY");
    icsLines.push(`SUMMARY:💪 Meal: ${reminder.title}`);
    icsLines.push(`DESCRIPTION:${cleanDesc}`);
    
    // Add Alarm: 1 hour before meal (which is our notification window!)
    icsLines.push("BEGIN:VALARM");
    icsLines.push("TRIGGER:-PT1H");
    icsLines.push("ACTION:DISPLAY");
    icsLines.push(`DESCRIPTION:MUSCLE MEAL REMINDER: Prepare ${reminder.title} now!`);
    icsLines.push("END:VALARM");
    
    icsLines.push("END:VEVENT");
  });
  
  icsLines.push("END:VCALENDAR");
  
  const icsString = icsLines.join("\r\n");
  
  // Detect iOS Safari
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  if (isIOS) {
    // Navigate directly to data URI to trigger iOS native "Add Calendar" popup
    const uri = "data:text/calendar;charset=utf-8," + encodeURIComponent(icsString);
    window.location.href = uri;
  } else {
    // Standard file download for PC and Android
    const blob = new Blob([icsString], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "muscle_meal_schedule.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  showToast("ICS Calendar Exported!");
  addCoachMessage("📅 **ICS file generated!** Import this file into Google Calendar or Apple Calendar to sync all alarms directly onto your phone.");
}

// ----------------------------------------------------
// MAIN EVENTS AND INITIALIZATION
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  renderMetrics();
  renderReminders();
  
  // Set up Quick Command clicks
  document.querySelectorAll(".quick-cmd-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const cmd = btn.getAttribute("data-cmd");
      addUserMessage(cmd);
      processCommand(cmd);
    });
  });
  
  // Chat form submit
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input-field");
  
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cmdText = chatInput.value.trim();
    if (!cmdText) return;
    
    addUserMessage(cmdText);
    chatInput.value = "";
    
    // Process input after slight delay to simulate thinking
    setTimeout(() => {
      processCommand(cmdText);
    }, 400);
  });
  
  // Modal controllers
  const btnSetup = document.getElementById("btn-setup-guide");
  const modalSetup = document.getElementById("modal-setup");
  const closeSetup = document.getElementById("close-modal-setup");
  
  btnSetup.addEventListener("click", () => modalSetup.classList.add("active"));
  closeSetup.addEventListener("click", () => modalSetup.classList.remove("active"));
  
  const btnProfile = document.getElementById("btn-edit-profile");
  const modalProfile = document.getElementById("modal-profile");
  const closeProfile = document.getElementById("close-modal-profile");
  
  btnProfile.addEventListener("click", () => {
    // Sync current values to input
    document.getElementById("input-gym-start").value = formatMinutesTo24h(state.profile.gymStart);
    document.getElementById("input-gym-end").value = formatMinutesTo24h(state.profile.gymEnd);
    document.getElementById("input-sleep-start").value = formatMinutesTo24h(state.profile.sleepStart);
    modalProfile.classList.add("active");
  });
  closeProfile.addEventListener("click", () => modalProfile.classList.remove("active"));
  
  const btnSaveProfile = document.getElementById("btn-save-profile");
  btnSaveProfile.addEventListener("click", () => {
    const gymStartVal = document.getElementById("input-gym-start").value;
    const gymEndVal = document.getElementById("input-gym-end").value;
    const sleepStartVal = document.getElementById("input-sleep-start").value;
    
    state.profile.gymStart = parseTimeToMinutes(gymStartVal);
    state.profile.gymEnd = parseTimeToMinutes(gymEndVal);
    state.profile.sleepStart = parseTimeToMinutes(sleepStartVal);
    state.profile.sleepEnd = (state.profile.sleepStart + 30) % 1440;
    
    saveState();
    renderMetrics();
    renderReminders();
    modalProfile.classList.remove("active");
    showToast("Profile Settings Saved!");
    addCoachMessage("⚙️ **Profile updated.** Meal timings recalculated relative to your gym and sleep windows. Stay on path!");
  });
  
  // Shopping list modal triggers
  const btnShopping = document.getElementById("btn-shopping-list");
  const modalShopping = document.getElementById("modal-shopping");
  const closeShopping = document.getElementById("close-modal-shopping");
  
  btnShopping.addEventListener("click", openShoppingList);
  closeShopping.addEventListener("click", () => modalShopping.classList.remove("active"));
  
  const btnCopyShopping = document.getElementById("btn-copy-shopping");
  btnCopyShopping.addEventListener("click", () => {
    const listItems = Array.from(document.querySelectorAll("#shopping-list-items span")).map(el => "- " + el.innerText).join("\n");
    navigator.clipboard.writeText(`🛒 MUSCLE MEAL COACH SHOPPING LIST:\n\n${listItems}`).then(() => {
      showToast("Shopping List Copied!");
    });
  });
  
  // Download ICS File Trigger
  document.getElementById("btn-download-ics").addEventListener("click", downloadICSFile);
  
  // Copy markdown table listener
  const btnCopyTable = document.getElementById("btn-copy-table");
  if (btnCopyTable) {
    btnCopyTable.addEventListener("click", copyMarkdownTable);
  }
  
  // Close modals on clicking background
  window.addEventListener("click", (e) => {
    if (e.target === modalSetup) modalSetup.classList.remove("active");
    if (e.target === modalProfile) modalProfile.classList.remove("active");
    if (e.target === modalShopping) modalShopping.classList.remove("active");
  });
});
