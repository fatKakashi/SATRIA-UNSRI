"use client"

import { useState, useEffect } from "react"

export const Notification = ({ message, type = "success", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500"

  if (!visible) return null

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${bgColor} text-white`}>
      <div className="flex items-center">
        {type === "success" ? (
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        )}
        <p>{message}</p>
        <button
          onClick={() => {
            setVisible(false)
            if (onClose) onClose()
          }}
          className="ml-4 text-white"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export const useNotification = () => {
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = "success", duration = 3000) => {
    setNotification({ message, type, duration })
  }

  const hideNotification = () => {
    setNotification(null)
  }

  return {
    notification,
    showNotification,
    hideNotification,
    NotificationComponent: notification ? (
      <Notification
        message={notification.message}
        type={notification.type}
        duration={notification.duration}
        onClose={hideNotification}
      />
    ) : null,
  }
}

