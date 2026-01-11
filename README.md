# FocusFlow

FocusFlow is a modern, React-based Project and Time Management application designed to help you stay organized and productive. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **📊 Dashboard**: Get a high-level view of your productivity stats and recent activities.
- **📋 Kanban Board**: Manage tasks with a drag-and-drop interface.
- **🍅 Pomodoro Timer**: Built-in timer with work/break modes to keep you focused.
- **📁 Projects**: Create and track multiple projects with detailed views.
- **📈 Analytics**: Visual insights into your task completion and focus time.
- **📅 Calendar**: Monthly view to keep track of deadlines and events.
- **📝 Notes**: Quick sticky notes for ideas and to-dos.
- **🔐 Authentication**: Secure login and registration powered by Supabase.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn UI (Component logic)
- **Icons**: Lucide React
- **Backend/Auth**: Supabase
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/YOUR_USERNAME/IT-PROJECT.git
    cd focus-flow
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

## Project Structure

```
src/
├── components/     # Reusable UI components and Layouts
├── contexts/       # React Contexts (e.g., AuthContext)
├── lib/            # Utilities and Supabase client
├── pages/          # Application pages (Dashboard, Kanban, etc.)
└── ...
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
