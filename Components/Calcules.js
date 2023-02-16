export const Calories = (weight, height, age, sex) => {
    const malecalories = (10*weight)+(6.25*height)-(5*age+5)
    const womencalories = (10*weight)+(6.25*height)-(5*age-161)
    
    return sex === "Female" ? womencalories : malecalories
}