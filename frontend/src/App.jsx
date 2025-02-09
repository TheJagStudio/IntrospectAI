import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Demo from './pages/Demo';
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";


function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/demo" element={<Demo />} />
				<Route path="/landing" element={<Landing />} />
			</Routes>
		</div>
	);
}

export default App;
