export const calorie = (data) => {
    let cal = 0
    let carbs = 0
    let protein = 0
    let fat = 0
    let fibre = 0

    data?.map(item=>{
        cal = item.calories + cal
        carbs = item.carbs + carbs
        protein = item.protein + protein
        fat = item.fat + fat
        fibre = item.fiber + fibre
    })

    return {cal, carbs, protein, fat, fibre}
}