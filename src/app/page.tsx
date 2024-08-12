export default function Home() {
  
  return (
    <div className="bg-white rounded-lg shadow-lg h-3/4 m-12">
    <div className="flex min-h-screen flex-col items-center justify-center bg-violet-500 dark:bg-gray-900 relative shadow-xl">
      {/* Login Button */}
      <div className="absolute top-4 right-4">
        <a href="/login" className="inline-block bg-white text-violet-500 py-2 px-6 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition">
          Login
        </a>
      </div>
  
      {/* Content */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-black mb-8">
          Welcome to Mind Bender!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          "Practice makes a man perfect, and quizzes<br /> sharpen your mind. Let's get started on the path to perfection!"
        </p>
        <a href="/quiz/1" className="inline-block bg-black text-white py-3 px-8 rounded-lg font-semibold shadow-md hover:bg-violet-600 transition">
          Get Started
        </a>
      </div>
    </div>
  </div>
  
  
  );
}
