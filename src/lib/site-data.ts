import hariyali from "@/assets/dish-hariyali.jpg";
import boneless65 from "@/assets/dish-boneless65.jpg";
import phaal from "@/assets/dish-phaal.jpg";
import wings from "@/assets/dish-wings.jpg";
import pakoda from "@/assets/dish-pakoda.jpg";
import leg from "@/assets/dish-leg.jpg";
import lollipop from "@/assets/dish-lollipop.jpg";

export const brand = { name: "A1 EATS", tagline: "DELICIOUS CHICKEN" };

export type Dish = { id: string; name: string; description: string; image: string; tags: string[] };

export const menu: Dish[] = [
  { id: "hariyali", name: "Hariyali Chicken", description: "Chicken in a vibrant green herb marinade, finished with smoky char.", image: hariyali, tags: ["Green herbs", "Chargrilled"] },
  { id: "boneless-65", name: "Chicken Boneless 65", description: "Boneless chicken, spicy and crisp — a Chennai classic.", image: boneless65, tags: ["Boneless", "Spicy"] },
  { id: "crispy-phaal", name: "Chicken Crispy Phaal (Boneless)", description: "Boneless chicken in a golden, crunchy coating.", image: phaal, tags: ["Boneless", "Extra crispy"] },
  { id: "wings", name: "Chicken Wings", description: "Masala-coated wings, crisp outside and juicy within.", image: wings, tags: ["Wings", "Spicy"] },
  { id: "pakoda", name: "Chicken Pakoda", description: "Spiced chicken fritters, fried until crunchy.", image: pakoda, tags: ["Fried", "Street-style"] },
  { id: "leg", name: "Chicken Leg", description: "Whole chicken leg with a spiced, charred crust.", image: leg, tags: ["Bone-in", "Charred"] },
  { id: "lollipop", name: "Chicken Lollipop", description: "Frenched drumettes with a fiery red coating.", image: lollipop, tags: ["Bone-in", "Fiery"] },
];

const maps = (area: string) =>
  `https://www.google.com/maps/search/?api=1&query=A1%20Eats%20Delicious%20Chicken%20${area}%20Chennai`;

export const locations = [
  { id: "triplicane", name: "Triplicane", city: "Chennai", description: "Your A1 EATS crispy chicken stop in Triplicane.", mapsUrl: maps("Triplicane"), x: 70, y: 72 },
  { id: "kolathur", name: "Kolathur", city: "Chennai", description: "Hot, fresh A1 EATS chicken in Kolathur.", mapsUrl: maps("Kolathur"), x: 30, y: 26 },
  { id: "perambur", name: "Perambur", city: "Chennai", description: "Satisfy the craving at A1 EATS Perambur.", mapsUrl: maps("Perambur"), x: 58, y: 40 },
];

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Our Chicken", href: "#menu" },
  { label: "The Story", href: "#story" },
  { label: "How It's Made", href: "#process" },
  { label: "Locations", href: "#locations" },
];
