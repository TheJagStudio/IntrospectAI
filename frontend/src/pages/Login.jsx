import Wrapper from "../components/Wrapper";

const Login = ({ signInWithGoogle }) => {
	return (
		<Wrapper>
			<div className="min-h-screen bg-gradient-to-r from-purple-600 to-purple-700 py-16">
				<div className="container mx-auto px-6">
					<div className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-auto">
						<h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
						<form className="space-y-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
								<input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Enter your email" />
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
								<input type="password" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Enter your password" />
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500" />
									<label className="ml-2 block text-sm text-gray-700">Remember me</label>
								</div>
								<a href="#" className="text-sm text-purple-600 hover:text-purple-500">
									Forgot password?
								</a>
							</div>
							<button type="submit" className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition">
								Sign In
							</button>
						</form>
						<div className="flex flex-col gap-5 items-center justify-center my-6">
                            <div className="border-t border-gray-300 w-1/3"></div>
							<button className="google-sign-in rounded-full shadow-xl shadow-purple-50" onClick={signInWithGoogle}>
								<img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google logo" />
								Sign In with Google
							</button>
						</div>
						<p className="text-center mt-6 text-gray-600">
							Don't have an account?
							<a href="#" className="text-purple-600 hover:text-purple-500 font-semibold">
								Sign up
							</a>
						</p>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Login;
