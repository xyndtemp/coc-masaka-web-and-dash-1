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

  if (isLoading) return <div>Loading cron job results...</div>;
  if (error) return <Alert variant="destructive"><AlertDescription>Error fetching cron job results</AlertDescription></Alert>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Cron Job Results</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Last run: {data.lastRun}</p>
        <p>Emails sent: {data.emailsSent}</p>
        <p>Status: {data.status}</p>
      </CardContent>
    </Card>
  );
};

export default CronJobResults;