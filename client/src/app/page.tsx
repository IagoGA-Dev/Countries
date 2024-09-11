export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <p className="text-center text-xl sm:text-2xl font-medium text-gray-800 mb-6">
        Welcome to the Countries App!
      </p>
      <a
        href="/countries"
        className="rounded-full border border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center 
                   hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-transparent text-base sm:text-lg font-semibold 
                   text-blue-600 dark:text-blue-400 h-12 px-6 sm:px-8"
      >
        View Country List
      </a>
    </main>
  );
}
