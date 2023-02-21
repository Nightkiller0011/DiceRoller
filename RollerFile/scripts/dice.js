let clicked = false

// Rolls Dice and returns list
function roll(dice_sides, dice_count){
    let list_rolls = []
    for (let i=0; i<dice_count;i++){
        let roll = Math.floor(Math.random() * (dice_sides)) + 1;
        list_rolls.push(roll);
    }
    return list_rolls
}

// Finds sum of dice rolls
function sum_of(rolls, quantity){
    let sum = 0;
    for (let i=0; i< quantity;i++){
        sum += rolls[i];
    }
    return sum
}

// Main function
function rollDice(event){
    if(!clicked)
    {
        // Fetch Dice Sides and count
        let dice_sides = parseInt(event.target.dataset.sides);
        let dice_count = parseInt(document.querySelector("#diceCount").value);

        // Fetch Stat block numbers
        let stat_mod = 0
        let stats = document.getElementsByName('mod_box');

        // Fetch Advantage and Proficienct
        let tage = document.getElementsByName('tage')
        let profi = document.getElementsByName('proficiency')
        let expert = document.getElementsByName('expertise')

        // Fetch Level
        let level = parseInt(document.querySelector("#level").value);

        // Is level NaN or ""
        if (isNaN(level) || level == "") {
            level = 1
        }

        //  Calculate Stat Modifiers and return selected modifier
        stat_mod = find_mod(stats)

        // Calculate overall Modifier
        let modify = stat_mod
        if (dice_sides == 20 && expert[0].checked) {
            pro_modify = proficiency(level);
            modify = (pro_modify * 2) + stat_mod
        }
        else if (dice_sides == 20 && profi[0].checked) {
            pro_modify = proficiency(level);
            modify = pro_modify + stat_mod
        }


        // Is Modify NaN?
        if(isNaN(modify))
        {
            modify = 0;
        }

        // Is Dice Count NaN
        if(isNaN(dice_count))
        {
            dice_count = 1;
        }

        // If advantage or disadvantage are checked, change dice count to 2
        if(vantage(tage) && (dice_count==1 || dice_count==2 ) && dice_sides == 20)
        {
            dice_count = 2
        }

        // Set List of Dice Rolls
        let result = roll(dice_sides, dice_count);
        document.querySelector("#crit").textContent = " "
        
        
        
        // If one Dice or disadvantage/advantage, check for crits
        if(dice_sides == 20 && dice_count < 3){
            for (let index = 0; index < 3; index++) {

                // If Else for Advantage or Disadvantage
                if(tage[0].checked){
                    if ((result[0] == 20 || result[1] == 20) || (result[0] == 1 && result[1] == 1)) {
                        display_crit(result[index], tage)
                    }
                }
                else if(tage[1].checked){
                    if ((result[0] == 1 || result[1] == 1) || (result[0] == 20 && result[1] == 20)) {
                        display_crit(result[index], tage)
                    }
                }
                else{
                    display_crit(result[index], tage)
                }
            }
        }
    
        
        // Run program for more dice
        let sum = sum_of(result, dice_count);

        // Display Results
        document.querySelector("#rolls").textContent = result;
        document.querySelector("#sum").textContent = sum+modify; 

        // Shake Dice
        event.target.classList.add("shake");
        clicked = true;
    } 
}

// Finds Stat Modifier
function find_mod(stats){

    // Calculate STR Modifier and Display it
    let str = parseInt(document.querySelector("#str_stat").value);
    let str_mod = Math.floor((str - 10)/2)
    document.querySelector("#str_mod").textContent = str_mod

    // Calculate DEX Modifier and Display it
    let dex = parseInt(document.querySelector("#dex_stat").value);
    let dex_mod = Math.floor((dex - 10)/2)
    document.querySelector("#dex_mod").textContent = dex_mod

    // Calculate CON Modifier and Display it
    let con = parseInt(document.querySelector("#con_stat").value);
    let con_mod = Math.floor((con - 10)/2)
    document.querySelector("#con_mod").textContent = con_mod

    // Calculate INT Modifier and Display it
    let int = parseInt(document.querySelector("#int_stat").value);
    let int_mod = Math.floor((int - 10)/2)
    document.querySelector("#int_mod").textContent = int_mod

    // Calculate WIS Modifier and Display it
    let wis = parseInt(document.querySelector("#wis_stat").value);
    let wis_mod = Math.floor((wis - 10)/2)
    document.querySelector("#wis_mod").textContent = wis_mod

    // Calculate CHA Modifier and Display it
    let cha = parseInt(document.querySelector("#cha_stat").value);
    let cha_mod = Math.floor((cha - 10)/2)
    document.querySelector("#cha_mod").textContent = cha_mod

    // return the selected Modifier.
    if (stats[0].checked) {
        return str_mod
    }
    else if (stats[1].checked) {
        return dex_mod
    }
    else if (stats[2].checked) {
        return con_mod
    }
    else if (stats[3].checked) {
        return int_mod
    }
    else if (stats[4].checked) {
        return wis_mod
    }
    else if (stats[5].checked) {
        return cha_mod
    }
    else{
        return 0
    }
}

// Finds Proficiency
function proficiency(level){
    if (level <= 4) {
        return 2;
    }
    else if (level <= 8) {
        return 3;
    }
    else if (level <= 12) {
        return 4;
    }
    else if (level <= 16) {
        return 5;
    }
    else if (level <= 20) {
        return 6;
    }
}

// Check for crits
function display_crit(result, tage){

    if(result == 20)
    {
        document.querySelector("#crit").textContent = "Critical Hit!"
    }
    else if(result == 1)
    {
        document.querySelector("#crit").textContent = "Critical Fail!"
    }
}

// Check for Advantage or Disadvantage
function vantage(tage){
    if(tage[0].checked || tage[1].checked){
        return true
    }
    else{
        return false
    }
}


// Rumble event
function endRumble(event){
    event.target.classList.remove("shake")
    clicked = false
}

// Event Listeners
document.querySelector("#d4_img").addEventListener("click", rollDice)
document.querySelector("#d6_img").addEventListener("click", rollDice)
document.querySelector("#d8_img").addEventListener("click", rollDice)
document.querySelector("#d10_img").addEventListener("click", rollDice)
document.querySelector("#d12_img").addEventListener("click", rollDice)
document.querySelector("#d20_img").addEventListener("click", rollDice)
document.querySelector("#advanced-roller").addEventListener('animationend', endRumble)


// let advan = document.querySelector("advantage")
// if(advan.checked)
