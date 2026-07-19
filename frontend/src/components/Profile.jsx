import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-3xl bg-slate-900 px-6 py-8 text-white shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Account overview</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">User Profile</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            A modern profile layout with clear personal details, quick activity highlights,
            and a polished card-based presentation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-2xl font-bold text-sky-700">
                JD
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">John Doe</h2>
                <p className="text-sm text-slate-500">Administrator</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
                <p className="mt-1 font-medium text-slate-800">john.doe@example.com</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Role</p>
                <p className="mt-1 font-medium text-slate-800">Administrator</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
            <p className="mt-1 text-sm text-slate-500">Latest actions from the account timeline</p>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <div>
                  <p className="font-medium text-slate-800">Logged in today</p>
                  <p className="text-sm text-slate-500">9:00 AM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" />
                <div>
                  <p className="font-medium text-slate-800">Updated profile settings</p>
                  <p className="text-sm text-slate-500">Preferences and notifications</p>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500" />
                <div>
                  <p className="font-medium text-slate-800">Viewed dashboard analytics</p>
                  <p className="text-sm text-slate-500">Performance overview</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;