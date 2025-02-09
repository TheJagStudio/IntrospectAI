import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AIModules from "./pages/AIModules";
import Solutions from "./pages/Solutions";
import About from "./pages/About";
import History from "./pages/History";
import { useAtom } from "jotai";
import { userAtom } from "./Variables";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

// Initialize Firebase (replace with your actual config)
const firebaseConfig = {
	apiKey: "AIzaSyAK3vfdXtHy53z5NhavJpF29_ysUGhrVjc",
	authDomain: "cornell-hackathon-982d5.firebaseapp.com",
	projectId: "cornell-hackathon-982d5",
	storageBucket: "cornell-hackathon-982d5.firebasestorage.app",
	messagingSenderId: "789026853297",
	appId: "1:789026853297:web:d5585b562865db6a006d90",
	measurementId: "G-YKDVF0W553",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

function App() {
	const [user, setUser] = useAtom(userAtom);

	useEffect(() => {
		if (localStorage.getItem("user_introspect")) {
			setUser(JSON.parse(localStorage.getItem("user_introspect")));
		}
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			localStorage.setItem("user_introspect", JSON.stringify(user));
		});

		return () => unsubscribe();
	}, []);

	const signInWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			console.log("User signed in:", result.user);
			window.location.href = "/apps";
		} catch (error) {
			console.error("Error signing in:", error.code, error.message);
		}
	};

	const signOut = async () => {
		try {
			await auth.signOut();
			localStorage.removeItem("user_introspect");
			console.log("User signed out");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	return (
		<div>
			<Router>
				<Routes>
					{user && (
						<>
							{/* <Route path="/dashboard" element={<Home />} /> */}
							<Route path="/profile" element={<Profile />} />
							{/* <Route path="/demo" element={<Demo />} /> */}
							<Route path="/apps" element={<AIModules />} />
							<Route path="/history" element={<History />} />
							<Route path="/session/:sessionId" element={<Home />} />
						</>
					)}
					<Route path="/" element={<Landing />} />
					<Route path="/login" element={<Login signInWithGoogle={signInWithGoogle} />} />
					<Route path="/solutions" element={<Solutions />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
