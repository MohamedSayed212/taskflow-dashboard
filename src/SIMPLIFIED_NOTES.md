# What I simplified

I kept the app features and animations, but made the logic easier to read.

## Main changes

1. `Context/AppDataProvider.jsx`
   - Now it is the main place for app data logic.
   - It has simple functions: `addTask`, `updateTask`, `deleteTask`, `addProject`, `addRequest`, `addReport`.

2. `lib/appStorage.js`
   - Simplified localStorage logic.
   - It now only does 3 things: load, save, clear.

3. `Components/SideBar.jsx`
   - Removed duplicated search popup logic from the sidebar.
   - Sidebar now opens `GlobalSearchPopup` instead.
   - Added one small reusable `SidebarSection` component.

4. `Components/AddTaskModal.jsx`
   - Simplified the add/edit task form.
   - Still supports adding tasks, editing tasks, choosing project, status, priority, and due date.

## Important learning flow

- `AppDataProvider` owns the app data.
- `SearchProvider` owns the search text.
- `SideBar` opens the global search.
- Pages read data using `useAppData()`.
- Pages read search using `useSearch()`.

## Files to study first

1. `Context/AppDataProvider.jsx`
2. `Context/SearchProvider.jsx`
3. `Components/SideBar.jsx`
4. `Components/AddTaskModal.jsx`
5. `Pages/Tasks.jsx`
