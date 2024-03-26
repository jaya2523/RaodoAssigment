interface Trip {
    startPoint: string;  // Pickup point or warehouse
    endPoint: string;    // Drop point or warehouse
}

interface Shipment {
    pickups: string[];   // List of pickup points
    drops: string[];     // List of drop points
}

function validateTrips(trips: Trip[], shipment: Shipment): boolean {
    const visitedPickups: Set<string> = new Set();
    const visitedDrops: Set<string> = new Set();

    // Add warehouse as a via point if needed
    const viaPoint = "W";
    const pointsToVisit: string[] = [...shipment.pickups, viaPoint, ...shipment.drops];

    for (const point of pointsToVisit) {
        // Check if the point has been visited as a pickup
        if (shipment.pickups.includes(point)) {
            visitedPickups.add(point);
        }
        // Check if the point has been visited as a drop
        if (shipment.drops.includes(point)) {
            // Ensure all pickups for this drop have been visited
            const correspondingPickup = shipment.pickups[shipment.drops.indexOf(point)];
            if (!visitedPickups.has(correspondingPickup)) {
                return false; // Invalid trip: Pickup not visited before drop
            }
            visitedDrops.add(point);
        }
        // Check if all pickups and drops have been visited before reaching the warehouse
        if (point === viaPoint) {
            if (!Array.from(visitedPickups).every(pickup => visitedDrops.has(pickup))) {
                return false; 
            }
            visitedPickups.clear();
        }
    }

    return true; // All trips are valid
}

// Example usage
const trips: Trip[] = [
    { startPoint: "A", endPoint: "W" },
    { startPoint: "B", endPoint: "W" },
    { startPoint: "W", endPoint: "C" },
    { startPoint: "W", endPoint: "D" }
];

const shipment: Shipment = {
    pickups: ["A", "B"],
    drops: ["C", "D"]
};

console.log(validateTrips(trips, shipment)); // Output: true (Valid set of trips)
