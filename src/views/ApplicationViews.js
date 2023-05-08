import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { EventList } from "../components/events/EventList"
import { GameList } from "../components/game/GameList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/events/EventForm"
import { EventUpdate } from "../components/events/EventUpdate"
import { GameUpdate } from "../components/game/GameUpdate"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/events" element={<EventList /> } />
                <Route path="/games" element={<GameList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/events/:eventId/edit" element={<EventUpdate />} />
                <Route path="/games/:gameId/edit" element={<GameUpdate />} />
            </Route>
        </Routes>
    </>
}
