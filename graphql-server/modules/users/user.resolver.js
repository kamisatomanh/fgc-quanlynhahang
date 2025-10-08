const pool = require("../../db");
const mapStatusToDB = status => status === "active" ? 1 : 0;
const mapDBToStatus = value => value === 1 ? "active" : "inactive";
module.exports = {
    Query: {
        users: async () => {
            const [rows] = await pool.query("SELECT * FROM users");
            return rows.map(r => ({...r, status: mapDBToStatus(r.status) }));
        },
        user: async (_, { user_id }) => {
            const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
            if (!rows[0]) return null;
            rows[0].status = mapDBToStatus(rows[0].status);
            return rows[0];
        },
    },

    Mutation: {
        addUser: async (_, { full_name, phone_number, password_hash, role, bank_name, bank_number, status }) => {
        const dbStatus = mapStatusToDB(status);
        const [result] = await pool.query(
            "INSERT INTO users (full_name, phone_number, password_hash, role, bank_name, bank_number, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [full_name, phone_number, password_hash, role, bank_name || null, bank_number || null, dbStatus]
        );
        const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [result.insertId]);
        rows[0].status = mapDBToStatus(rows[0].status)
        return rows[0];
        },

        updateUser: async (_, args) => {
            const fields = [];
            const values = [];
            for (const key in args) {
                if (key !== "user_id" && args[key] !== undefined) {
                    if (key === "status"){
                         values.push(mapStatusToDB(args[key])); // map enum -> 0/1
                    } else {
                        values.push(args[key]);
                    }
                    fields.push(`${key} = ?`);
                }
            }
            values.push(args.user_id);

            await pool.query(`UPDATE users SET ${fields.join(", ")} WHERE user_id = ?`, values);

            const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [args.user_id]);
            rows[0].status = mapDBToStatus(rows[0].status);
            return rows[0];
        },

        deleteUser: async (_, { user_id }) => {
            await pool.query("DELETE FROM users WHERE user_id = ?", [user_id]);
            return true;
        },
    },
};