import {useState} from "react";
import {Box, TextField} from "@mui/material";

const AddHabitForm = () => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">("daily");

  return <form>
    <Box>
      <TextField label="Habit Name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
      />
    </Box>
  </form>;
};

export default AddHabitForm;