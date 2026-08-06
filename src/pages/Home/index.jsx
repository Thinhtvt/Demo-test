import { useState, useMemo } from 'react'
import { Card, Button, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import TaskItem from '../../components/TaskItem'

function HomePage() {
  const navigate = useNavigate()

  const [taskList, setTaskList] = useState([])
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  async function getTaskList() {
    const response = await axios.get('http://localhost:4000/tasks')
    setTaskList(response.data)
  }

  const handleAddTask = async () => {
    const newTask = {
      name: taskName,
      description: taskDescription,
    }
    await axios.post('http://localhost:4000/tasks', newTask)
    getTaskList()
    setTaskName('')
    setTaskDescription('')
  }
  const handleUpdateTask = async (id, name, description) => {
    const newTask = {
      name: name,
      description: description,
    }
    await axios.put(`http://localhost:4000/tasks/${id}`, newTask)
    getTaskList()
  }
  const handleDeleteTask = async (id) => {
    await axios.delete(`http://localhost:4000/tasks/${id}`)
    getTaskList()
  }

  const renderTaskList = useMemo(() => {
    return taskList.map((task) => (
      <TaskItem
        key={task.id}
        id={task.id}
        name={task.name}
        description={task.description}
        handleUpdateTask={handleUpdateTask}
        handleDeleteTask={handleDeleteTask}
      />
    ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskList])

  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <div style={{ margin: '24px auto', width: '500px' }}>
        <Card title="Thêm công việc" size="small" style={{ textAlign: 'left' }}>
          <label>Tên công việc</label>
          <Input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <label>Mô tả</label>
          <Input
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <Button
            type="primary"
            block
            style={{ marginTop: 24 }}
            onClick={() => handleAddTask()}
          >
            Thêm
          </Button>
        </Card>
        {renderTaskList}
      </div>
    </div>
  )
}

export default HomePage
