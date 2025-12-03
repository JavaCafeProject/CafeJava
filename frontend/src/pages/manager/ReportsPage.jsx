import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportCard from '../../components/ReportCard'; 
import reportApi from '../../api/reportApi'; 
import './ReportsPage.css'; 

const ReportsPage = () => {
  const navigate = useNavigate();

  const [dailySales, setDailySales] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [topProduct, setTopProduct] = useState(null);
  const [employeePerf, setEmployeePerf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const [salesRes, revenueRes, productRes, empRes] = await Promise.all([
          reportApi.getDailySales(),
          reportApi.getRevenue(),
          reportApi.getTopProducts(),
          reportApi.getEmployeePerformance()
        ]);

        setDailySales(salesRes.data);
        setRevenue(revenueRes.data);
        setTopProduct(Array.isArray(productRes.data) ? productRes.data[0] : productRes.data);
        setEmployeePerf(Array.isArray(empRes.data) ? empRes.data[0] : empRes.data);
        
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("An error occurred while loading reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <div className="loading-container">Data is being analyzed... 📊</div>;
  if (error) return <div className="error-container">{error}</div>;

  return (
    <div className="reports-container">
      
      <div className="reports-header">
        <button className="btn-back" onClick={() => navigate('/manager')}>
          ← Return to Panel
        </button>
        <h1 className="reports-title">Reports & Statistics</h1>
      </div>

      <div className="reports-grid">
        
        <ReportCard title="📅 Daily Sales">
          {dailySales && (
            <div>
              <p className="report-row">
                <span className="report-label">Giro:</span>
                <span className="highlight-value val-money">{dailySales.revenue} $</span>
              </p>
              <p className="report-row">
                <span className="report-label">Total Order:</span>
                <span className="highlight-value">{dailySales.totalOrders}</span>
              </p>
              <p className="sub-info">Date: {dailySales.date}</p>
            </div>
          )}
        </ReportCard>

        <ReportCard title="💰 Income Statement">
          {revenue && (
            <div>
              <p className="report-label">Total (All Times):</p>
              <p className="highlight-value val-money" style={{ fontSize: '1.5rem' }}>
                {revenue.totalRevenueAllTime} $
              </p>
              
              <hr className="divider"/>
              
              <p className="report-row">
                <span className="report-label">Today:</span>
                <span className="highlight-value">{revenue.totalRevenueToday} $</span>
              </p>
            </div>
          )}
        </ReportCard>

        <ReportCard title="☕ Best Seller">
          {topProduct && (
            <div>
              <p className="highlight-value val-product">
                {topProduct.itemName}
              </p>
              <p className="report-row" style={{ marginTop: '10px' }}>
                <span className="report-label">Quantity Sold:</span>
                <span className="highlight-value">{topProduct.totalQuantitySold}</span>
              </p>
            </div>
          )}
        </ReportCard>

        <ReportCard title="⭐ Employee of the Month">
          {employeePerf && (
            <div>
              <p className="highlight-value val-employee">
                {employeePerf.firstName} {employeePerf.lastName}
              </p>
              <p className="report-row" style={{ marginTop: '10px' }}>
                <span className="report-label">Order:</span>
                <span className="highlight-value">{employeePerf.totalOrders}</span>
              </p>
              <p className="sub-info">
                Turnover Earned: {employeePerf.totalRevenue} $
              </p>
            </div>
          )}
        </ReportCard>

      </div>
    </div>
  );
};

export default ReportsPage;