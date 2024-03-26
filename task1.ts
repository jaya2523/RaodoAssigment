interface UserData {
    user_id: number;
    logged_in: string;
    logged_out: string | null;
    lastSeenAt: string;
}
const user_data: UserData[] = [
    { user_id: 1, logged_in: "2024-03-01 10:00:00", logged_out: "2024-03-01 12:00:00", lastSeenAt: "2024-03-01 11:30:00" },
    { user_id: 2, logged_in: "2024-03-02 08:00:00", logged_out: "2024-03-02 10:30:00", lastSeenAt: "2024-03-02 10:20:00" },
    { user_id: 3, logged_in: "2024-03-02 11:00:00", logged_out: null, lastSeenAt: "2024-03-02 11:30:00" }  
];

const selected_month: number = 3; // March

const filtered_data: UserData[] = user_data.filter(user => new Date(user.logged_in).getMonth() + 1 === selected_month);

const logged_in_users: Set<number> = new Set();
const active_users: Set<number> = new Set();

for (const user of filtered_data) {
    logged_in_users.add(user.user_id);
    if (!user.logged_out || new Date(user.lastSeenAt).getMonth() + 1 === selected_month) {
        active_users.add(user.user_id);
    }
}

const monthly_logged_in_count: number = logged_in_users.size;
const monthly_active_count: number = active_users.size;

console.log("Monthly Logged In Users:", monthly_logged_in_count);
console.log("Monthly Active Users:", monthly_active_count);
