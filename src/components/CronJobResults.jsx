import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

const fetchCronJobResults = async () => {
  const response = await axios.get('/api/checkBirthdays');
  return response.data;
};

const CronJobResults = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cronJobResults'],
    queryFn: fetchCronJobResults,
    refetchInterval: 60000, // Refetch every minute
  });

  if (isLoading) return <div>Checking for birthdays...</div>;
  if (error) return <Alert variant="destructive"><AlertDescription>Error checking birthdays: {error.message}</AlertDescription></Alert>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Birthdays Today</CardTitle>
      </CardHeader>
      <CardContent>
        {data.birthdaysToday > 0 ? (
          <p>{data.birthdaysToday} birthday{data.birthdaysToday > 1 ? 's' : ''} today. {data.emailsSent} email{data.emailsSent > 1 ? 's' : ''} sent.</p>
        ) : (
          <p>No birthdays today</p>
        )}
        <p>Last checked: {new Date(data.lastRun).toLocaleString()}</p>
      </CardContent>
    </Card>
  );
};

export default CronJobResults;