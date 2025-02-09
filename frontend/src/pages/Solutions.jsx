import Wrapper from "../components/Wrapper";
import { ArrowRight, Brain, Cpu, Database, Zap, CheckCircle } from "lucide-react";

const Solutions = () => {
	return (
		<Wrapper>
			{/* Hero Section */}
			<header className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
				<div className="container mx-auto px-6 py-24">
					<div className="max-w-3xl">
						<h1 className="text-5xl font-bold mb-6">AI Solutions for Modern Healthcare</h1>
						<p className="text-xl mb-8 text-purple-100">Discover how our AI-powered solutions can transform your medical practice with intelligent documentation and analysis.</p>
						<button className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-50 transition inline-flex items-center">
							View Pricing <ArrowRight className="ml-2" />
						</button>
					</div>
				</div>
			</header>

			{/* Features Grid */}
			<section className="py-20">
				<div className="container mx-auto px-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<div className="p-8 border border-gray-200 rounded-xl">
							<Brain className="w-12 h-12 text-purple-600 mb-4" />
							<h3 className="text-2xl font-semibold mb-4">AI-Powered Analysis</h3>
							<p className="text-gray-600">Advanced machine learning algorithms process medical conversations and documentation with high accuracy.</p>
						</div>
						<div className="p-8 border border-gray-200 rounded-xl">
							<Cpu className="w-12 h-12 text-purple-600 mb-4" />
							<h3 className="text-2xl font-semibold mb-4">Real-time Processing</h3>
							<p className="text-gray-600">Instant documentation and analysis during patient consultations.</p>
						</div>
						<div className="p-8 border border-gray-200 rounded-xl">
							<Database className="w-12 h-12 text-purple-600 mb-4" />
							<h3 className="text-2xl font-semibold mb-4">Secure Storage</h3>
							<p className="text-gray-600">HIPAA-compliant storage and processing of all medical data.</p>
						</div>
						<div className="p-8 border border-gray-200 rounded-xl">
							<Zap className="w-12 h-12 text-purple-600 mb-4" />
							<h3 className="text-2xl font-semibold mb-4">Fast Integration</h3>
							<p className="text-gray-600">Quick and seamless integration with existing medical systems.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-6">
					<h2 className="text-4xl font-bold text-center mb-16">Pricing Plans</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Starter Plan */}
						<div className="bg-white p-8 rounded-xl shadow-sm">
							<h3 className="text-2xl font-semibold mb-4">Starter</h3>
							<p className="text-4xl font-bold mb-6">
								$99<span className="text-lg text-gray-600">/mo</span>
							</p>
							<ul className="space-y-4 mb-8">
								<li className="flex items-center">
									<CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Basic AI transcription
								</li>
								<li className="flex items-center">
									<CheckCircle className="w-5 h-5 text-green-500 mr-2" /> 5 users included
								</li>
								<li className="flex items-center">
									<CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Basic analytics
								</li>
							</ul>
							<button className="w-full bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">Get Started</button>
						</div>

						{/* Professional Plan */}
						<div className="bg-white p-8 rounded-xl shadow-sm border-2 border-purple-600">
							<h3 className="text-2xl font-semibold mb-4">Professional</h3>
							<p className="text-4xl font-bold mb-6">
								$199<span className="text-lg text-gray-600">/mo</span>
							</p>
							<ul className="space-y-4 mb-8">
								<li className="flex items-center">
									<CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Advanced AI features
								</li>
								<li className="flex items-center">
									<CheckCircle className="w-5 h-5 text-green-500 mr-2" /> 15 users included
								</li>
								<li className="flex items-center">
									<CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Advanced analytics
								</li>
							</ul>
							<button className="w-full bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">Get Started</button>
						</div>

						{/* Enterprise Plan */}
						<div className="bg-white p-8 rounded-xl shadow-sm">
							<h3 className="text-2xl font-semibold mb-4">Enterprise</h3>
							<p className="text-4xl font-bold mb-6">Custom</p>
							<ul className="space-y-4 mb-8">
								<li className="flex items-center">
									<CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Custom AI solutions
								</li>
								<li className="flex items-center">
									<CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Unlimited users
								</li>
								<li className="flex items-center">
									<CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Custom analytics
								</li>
							</ul>
							<button className="w-full bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">Contact Sales</button>
						</div>
					</div>
				</div>
			</section>
		</Wrapper>
	);
};

export default Solutions;
