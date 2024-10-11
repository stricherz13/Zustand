import './App.css'
import {Box, Container, Typography} from "@mui/material";
import AddHabitForm from "./components/add-habit-form.tsx";
import HabitList from "./components/habit-list.tsx";
import useHabitStore from "./store/store.ts";
import {useEffect} from "react";

function App() {
    const {fetchHabits} = useHabitStore();

    useEffect(() => {
        fetchHabits();;
    }, []);

    return (
      <Container>
          <Box>
              <Typography variant="h2" component="h1" gutterBottom align="center">Habit Tracker</Typography>
              <AddHabitForm/>
              <HabitList/>
          </Box>
      </Container>

    )
}

export default App
