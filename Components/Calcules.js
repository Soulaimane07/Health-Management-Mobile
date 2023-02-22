export const IMC = (user) => {
    const IMCData = [
        {
            "title":"Maigreur",
            "from": 0,
            "to": 18.5,
            "color":"#219ebc"
        },
        {
            "title":"Normal",
            "from": 18.5,
            "to": 25.5,
            "color":"#25a244"
        },
        {
            "title":"Surpoids",
            "from": 25,
            "to": 30,
            "color":"#ff9914"
        },
        {
            "title":"Obisité Moderee",
            "from": 30,
            "to": 40,
            "color":"#fb6107"
        },
        {
            "title":"Obesite Severe",
            "from": 40,
            "to": 100,
            "color":"red"
        },
    ]

    let title
    let imc
    let color

    const Indic = () => {
        const height = Number(user?.height?.x) * 100 + Number(user?.height?.y)
        const imc = (user?.weight)*10000 / Math.pow(height, 2)
        return imc
    }

    IMCData.map(item=>(
        Indic() <= item.to && Indic() >= item.from && (
            title = item.title,
            color = item.color,
            imc = (Indic())?.toFixed(2)
        )
    ))

    return {title, imc, color}
}

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