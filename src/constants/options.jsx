const SelectTravelList = [
    {
        id:"1",
        title: "Just Me",
        desc: "A sole traveles in exploration",
        icon: "✈️",
        people: "1",
    },
    {
        id:"2",
        title: "A Couple",
        desc: "Two traveles in tandem",
        icon: "🥂",
        people: "2",
    },
    {
        id:"3",
        title: "Family",
        desc: "A group of fun loving adv",
        icon: "🎊",
        people: "3 to 5",
    },
    {
        id:"4",
        title: "Friends",
        desc: "A bounch of thrill-seekes",
        icon: "💰",
        people: "5 to 10",
    },
]

// 

export default SelectTravelList

export const AI_Promt = "Generate Travel Plan for Location: {location}, for {numberOfDays} Days for {traveler} with a {budget} budget,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format."

// export const AI_Promt = "generate travel plan for {location} for {numberOfDays} days for {traveler} with {budget} budget, give me the hotels option , hotel name, hotel addresss, hotel price, hotel image url, geo cordinates, rating, description and suggest itinerary with details in json format. "