import {useState} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import useHabitStore from "../store/store.ts";

const AddHabitForm = () => {
    const [name, setName] = useState("");
    const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">("daily");

    const {habits, addHabit} = useHabitStore();

    console.log(habits);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            addHabit(name, frequency);
            setName("");
        }
    }

    return <form onSubmit={handleSubmit}>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
        }}>
            <TextField label="Habit Name"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       placeholder="Enter habbit name"
                       fullWidth
            />
            <FormControl fullWidth>
                <InputLabel>Frequency</InputLabel>
                <Select
                  value={frequency}
                  label="Frequncy"
                  onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">Add Habit</Button>
        </Box>
    </form>;
};

export default AddHabitForm;