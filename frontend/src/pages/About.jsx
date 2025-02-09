import Wrapper from "../components/Wrapper";
import { Users, Target, Trophy } from "lucide-react";

const About = () => {
	return (
		<Wrapper>
			{/* Hero Section */}
			<header className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
				<div className="container mx-auto px-6 py-24">
					<div className="max-w-3xl">
						<h1 className="text-5xl font-bold mb-6">Our Mission to Transform Healthcare</h1>
						<p className="text-xl mb-8 text-purple-100">We're building the future of medical documentation with advanced AI technology, making healthcare more efficient and accessible.</p>
					</div>
				</div>
			</header>

			{/* Mission Section */}
			<section className="py-20">
				<div className="container mx-auto px-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
						<div>
							<Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
							<h3 className="text-xl font-semibold mb-3">Our Team</h3>
							<p className="text-gray-600">A dedicated team of healthcare professionals, AI experts, and engineers.</p>
						</div>
						<div>
							<Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
							<h3 className="text-xl font-semibold mb-3">Our Mission</h3>
							<p className="text-gray-600">To revolutionize healthcare documentation through innovative AI solutions.</p>
						</div>
						<div>
							<Trophy className="w-12 h-12 text-purple-600 mx-auto mb-4" />
							<h3 className="text-xl font-semibold mb-3">Our Impact</h3>
							<p className="text-gray-600">Helping thousands of healthcare providers deliver better patient care.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Story Section */}
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-6">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-6">Our Story</h2>
						<p className="text-gray-600 mb-8">Founded in 2025, IntrospectAI began with a simple mission: to reduce the administrative burden on healthcare professionals. Our team of dedicated experts has worked tirelessly to develop AI solutions that transform medical documentation.</p>
						<p className="text-gray-600">Today, we're proud to serve thousands of healthcare providers across the country, helping them focus more on what matters most - patient care.</p>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="py-20">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div className="text-center">
							<img src="https://randomuser.me/api/portraits/men/1.jpg" alt="CEO" className="w-32 h-32 rounded-full mx-auto mb-4" />
							<h3 className="text-xl font-semibold">John Smith</h3>
							<p className="text-gray-600">CEO & Co-founder</p>
						</div>
						<div className="text-center">
							<img src="https://randomuser.me/api/portraits/women/1.jpg" alt="CTO" className="w-32 h-32 rounded-full mx-auto mb-4" />
							<h3 className="text-xl font-semibold">Sarah Johnson</h3>
							<p className="text-gray-600">CTO</p>
						</div>
						<div className="text-center">
							<img src="https://randomuser.me/api/portraits/men/2.jpg" alt="COO" className="w-32 h-32 rounded-full mx-auto mb-4" />
							<h3 className="text-xl font-semibold">Michael Chen</h3>
							<p className="text-gray-600">COO</p>
						</div>
                        <div className="text-center">
                            <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="CFO" className="w-32 h-32 rounded-full mx-auto mb-4" />
                            <h3 className="text-xl font-semibold">David Lee</h3>
                            <p className="text-gray-600">CFO</p>
                        </div>
					</div>
				</div>
			</section>
		</Wrapper>
	);
};

export default About;
