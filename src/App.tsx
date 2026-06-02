import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import ServerError from "./pages/ServerError";
import Terminal from "./pages/Terminal";

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/blog/:slug" element={<BlogPost />} />
					<Route path="/admin" element={<AdminLogin />} />
					<Route path="/admin/dashboard" element={<AdminDashboard />} />
					<Route path="/terminal" element={<Terminal />} />
					<Route path="/500" element={<ServerError />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
