import React, { useEffect, useState } from 'react';
import { Table, Typography, Spin } from 'antd';
import ticketImage from '../assets/downy.jpg'; // Background image

const { Title } = Typography;

const TicketStatus = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from an API
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      // Replace with your API endpoint
      const response = await fetch('/api/tickets');
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Ticket ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Farmer ID',
      dataIndex: 'farmerId',
      key: 'farmerId',
    },
    {
      title: 'Disease Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <a href={`/ticket/${record.id}`}>View Details</a>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <Title level={2}>Ticket Status</Title>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={tickets} columns={columns} rowKey="id" />
      )}
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundImage: `url(${ticketImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
  },
};

export default TicketStatus;
