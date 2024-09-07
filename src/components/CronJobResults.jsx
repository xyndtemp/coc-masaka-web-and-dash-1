import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

const fetchCronJobResults = async () => {
  const response = await axios.get('/api/cronJobResults');
  return response.data;
};

const CronJobResults = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cronJobResults'],
    queryFn: fetchCronJobResults,
    refetchInterval: 60000, // Refetch every minute
  });

  if (isLoading) return <div>Loading birthday information...</div>;
  if (error) return <Alert variant="destructive"><AlertDescription>Error fetching birthday information</AlertDescription></Alert>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Birthdays Sent Today</CardTitle>
      </CardHeader>
      <CardContent>
        {data.emailsSent > 0 ? (
          <p>{data.emailsSent} birthday email{data.emailsSent > 1 ? 's' : ''} sent today</p>
        ) : (
          <p>No birthdays today</p>
        )}
        <p>Last checked: {new Date(data.lastRun).toLocaleString()}</p>
      </CardContent>
    </Card>
  );
};

export default CronJobResults;