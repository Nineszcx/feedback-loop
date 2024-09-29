import React, { useState, useEffect } from 'react';
import Jobs from '../data/Jobs';
import Search from './Search';
import Chart from './Chart';
import '../css/Dashboard.css';

// 获取每天工作的数量
const getDailyJobCounts = (Jobs) => {
    const counts = {};
    Jobs.forEach(job => {
        const date = job.createdTime.split(' ')[0]; // 获取日期部分
        counts[date] = (counts[date] || 0) + 1; // 计数
    });
    return counts;
};

const itemsPerPage = 10; // 每页显示的项目数量

const Dashboard = () => {
    const [searchFilters, setSearchFilters] = useState({
        createdTime: '',
        content: '',
        id: '',
    });
    
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // 获取每天工作的数量
    const dailyJobCounts = getDailyJobCounts(Jobs);

    // 根据搜索过滤工作
    useEffect(() => {
        const filtered = Jobs.filter(job => {
            const matchesDate = searchFilters.createdTime ? job.createdTime.split(' ')[0] === searchFilters.createdTime : true;
            const matchesContent = searchFilters.content ? job.content.toLowerCase().includes(searchFilters.content.toLowerCase()) : true;
            const matchesId = searchFilters.id ? job.id.toString() === searchFilters.id : true;

            return matchesDate && matchesContent && matchesId;
        });

        setFilteredJobs(filtered);
        setCurrentPage(1); // 搜索时重置当前页为第一页
    }, [searchFilters]);

    // 分页逻辑
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const currentJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="dashboard">

            <div className="allchart-container">
                <Chart dailyJobCounts={dailyJobCounts} />
            </div>

            <div className="job-list-container">
                <Search searchFilters={searchFilters} setSearchFilters={setSearchFilters} />
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Created Time</th>
                            <th>Content</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentJobs.map(job => (
                            <tr key={job.id}>
                                <td>{job.id}</td>
                                <td>{job.createdTime}</td>
                                <td>{job.content}</td>
                                <td>{job.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* 分页控件 */}
                {totalPages > 1 && (
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <span
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
