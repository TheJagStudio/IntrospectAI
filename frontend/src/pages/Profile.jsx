import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User, Trophy, Calendar, Clock } from 'lucide-react';
import userData from '../data/userProfile.json';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../components/Wrapper';

const Profile = () => {
  const { user } = userData;
  const navigate = useNavigate();

  return (
    <Wrapper>
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full bg-purple-100"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{user.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy size={16} />
                  <span>Score: {user.score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Practice Statistics */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Practice History</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={user.practiceHistory.labels.map((label, index) => ({
                    name: label,
                    sessions: user.practiceHistory.sessions[index],
                    score: user.practiceHistory.scores[index]
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="sessions"
                      stroke="#2563eb"
                      name="Sessions"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="score"
                      stroke="#16a34a"
                      name="Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {user.recentActivities.map((activity) => (
                <div key={activity.id} className="border-b border-gray-100 pb-4">
                  <div className="flex items-start gap-3">
                    <Clock className="text-purple-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium">{activity.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <span>{activity.type}</span>
                        <span>•</span>
                        <span>Score: {activity.score}</span>
                        <span>•</span>
                        <span>{new Date(activity.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Wrapper>
  );
};

export default Profile; 