import { ColumnType } from '../utils/enums';
import { Badge, Box, Heading, IconButton, Stack, useColorModeValue } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Task } from './Task';
import useColumnTasks from '../hooks/useColumnTasks';

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: 'gray',
  'In Progress': 'blue',
  Blocked: 'red',
  Completed: 'green',
};

export const Column = ({ column }: { column: ColumnType }) => {
  const { tasks, addEmptyTask, updateTask, deleteTask } = useColumnTasks(column);

  const ColumnTasks = tasks.map((task, index) => 
  <Task key={task.id} task={task} index={index} onUpdate={updateTask} onDelete={deleteTask}/>);

  return (
    <Box>
      <Heading fontSize='md' mb={4} letterSpacing='wide'>
        <Badge px={2} py={1} rounded={'lg'} colorScheme={ColumnColorScheme[column]}>
          {column}
        </Badge>
      </Heading>
      <IconButton
        size='xs'
        w='full'
        color={useColorModeValue('gray.500', 'gray.400')}
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        _hover={{ bgColor: useColorModeValue('gray.200', 'gray.600') }}
        py={2}
        variant='solid'
        colorScheme='black'
        aria-label='add-task'
        icon={<AddIcon />}
        onClick={addEmptyTask}
      />
      <Stack
        direction={{ base: 'row', md: 'column' }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue('gray.50', 'gray.900')}
        rounded='lg'
        boxShadow='md'
        overflow='auto'
      >
        {ColumnTasks}
      </Stack>
    </Box>
  );
};