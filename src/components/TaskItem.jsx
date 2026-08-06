import { useState } from "react";
import { Card, Button, Input } from "antd";

function TaskItem({
  id,
  name,
  description,
  handleUpdateTask,
  handleDeleteTask,
}) {
  const [taskItemName, setTaskItemName] = useState(name);
  const [taskItemDescription, setTaskItemDescription] = useState(description);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card size="small" style={{ marginTop: 24, textAlign: "left" }}>
      {isEditing ? (
        <>
          <label>Tên công việc</label>
          <Input
            value={taskItemName}
            onChange={(e) => setTaskItemName(e.target.value)}
          />
          <label>Mô tả</label>
          <Input
            value={taskItemDescription}
            onChange={(e) => setTaskItemDescription(e.target.value)}
          />
        </>
      ) : (
        <>
          <h4>{name}</h4>
          <p>{description}</p>
        </>
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        {isEditing ? (
          <>
            <Button
              type="primary"
              onClick={() => {
                handleUpdateTask(id, taskItemName, taskItemDescription);
                setIsEditing(false);
              }}
            >
              Lưu
            </Button>
            <Button type="primary" ghost onClick={() => setIsEditing(false)}>
              Huỷ
            </Button>
          </>
        ) : (
          <Button type="primary" ghost onClick={() => setIsEditing(true)}>
            Cập nhật
          </Button>
        )}
        <Button
          type="primary"
          ghost
          danger
          onClick={() => handleDeleteTask(id)}
        >
          Xóa
        </Button>
      </div>
    </Card>
  );
}

export default TaskItem;
