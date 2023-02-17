export const Calories = (weight, height, age, sex, goal, active) => {
    let malecalories
    let womencalories

    goal === "Maintain Weight" && (
        <>
        {malecalories = (10*weight)+(6.25*height)-(5*age+5)}
        {womencalories = (10*weight)+(6.25*height)-(5*age-161)}
        </>
    )

    goal === "Lose Weight" && (
        <>
        {malecalories = (10*weight)+(6.25*height)-(5*age)+5-(((10*weight)+(6.25*height)-(5*age)+5)*15)/100}
        {womencalories = (10*weight)+(6.25*height)-(5*age)-161-(((10*weight)+(6.25*height)-(5*age)-161)*15)/100}
        </>
    )

    goal === "Gain Weight" && (
        <>
        {malecalories = (10*weight)+(6.25*height)-(5*age)+5+(((10*weight)+(6.25*height)-(5*age)+5)*15)/100}
        {womencalories = (10*weight)+(6.25*height)-(5*age)-161+(((10*weight)+(6.25*height)-(5*age)-161)*15)/100}
        </>
    )
    
    active === "Sédentaire" && (
        <>
        {malecalories = malecalories * 1.2}
        {womencalories = womencalories * 1.2}
        </>
    )

    active === "Légèrement actif" && (
        <>
        {malecalories = malecalories * 1.375}
        {womencalories = womencalories * 1.375}
        </>
    )
    active === "Modérément actif" && (
        <>
        {malecalories = malecalories * 1.55}
        {womencalories = womencalories * 1.55}
        </>
    )
    active === "Très actif" && (
        <>
        {malecalories = malecalories * 1.725}
        {womencalories = womencalories * 1.725}
        </>
    )

    return sex === "Female" ? womencalories : malecalories
}

export const Water = (weight) => {
    return weight*30
}

export const Steps = (goal) => {
    let step 

    goal === "Maintain Weight" && ( step = 6000 )

    goal === "Lose Weight" && ( step = 10000)

    goal === "Gain Weight" && ( step = 6000)

    return step
}