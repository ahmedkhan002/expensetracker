import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        url: { type: String, default: null },
        profileID: { type: String, default: null },
        password: { type: String, required: true },
        UserIncome: [
            {
                IncomeSource: { type: String, required: true },
                IncomeAmount: { type: Number, required: true },
                IncomeIcon: { type: String, required: true },
            }
        ],
        UserExpenses: [
            {
                ExpenseSource: { type: String, required: true },
                ExpenseAmount: { type: Number, required: true },
                ExpenseIcon: { type: String, required: true },
            }
        ],
    },
    { timestamps: true }
)

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
