import mongoose from "mongoose";
import { IDonarList } from "@/types/types";

const donarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "donar"],
    },
    bloodGroup: {
      type: String,
      required: [true, "blood group is required"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    lastDonated: {
      type: String,
      required: [true, "Last Donated is required"],
    },
    weight: {
      type: String,
      // required: [true, "Last Donated is required"],
    },
    vaccinated: {
      type: String,
    },
  },
  { timestamps: true }
);

const DonarList = mongoose.models.donarList || mongoose.model<IDonarList>("donarList", donarSchema);

export default DonarList;

// export default mongoose.model<IInventory>("Inventory", inventorySchema);
