export const requestChainData={
    "name": "sys-preprod-reqchain",
    "path": "request_chain",
    "version": "1.1.2",
    "workflow": {
        "exec_mode": "sequential",
        "processors": [
            {
                "exec_mode": "parallel",
                "processors": [
                    {
                        "name": "Log Processor",
                        "reference": "log",
                        "will_block": false
                    },
                    {
                        "name": "Cost Guardrail",
                        "reference": "cost",
                        "will_block": false
                    },
                    {
                        "name": "Rate Limiter",
                        "reference": "ratelimit",
                        "will_block": true
                    },
                    {
                        "name": "Sensitive Data Protection",
                        "reference": "dlp_gcp",
                        "will_block": true
                    },
                    {
                        "name": "Prompt Injection Detection",
                        "reference": "lakera",
                        "will_block": true
                    }
                ]
            },
            {
                "exec_mode": "parallel",
                "processors": [
                    {
                        "name": "Archive",
                        "reference": "archive",
                        "will_block": false
                    },
                    {
                        "name": "Secrets",
                        "reference": "secrets",
                        "will_block": false
                    }
                ]
            }
        ]
    },
    "description": "Pre-production request processor chain"
}
export const responseChainData={
    "name": "sys-preprod-respchain",
    "path": "request_chain",
    "version": "1.1.2",
    "workflow": {
        "exec_mode": "sequential",
        "processors": [
            {
                "name": "Cost Guardrail",
                "reference": "cost",
                "will_block": false
            },
            {
                "name": "Trust & Safety",
                "reference": "lakera",
                "will_block": true
            },
            {
                "exec_mode": "parallel",
                "processors": [
                    {
                        "name": "Log Processor",
                        "reference": "log",
                        "will_block": false
                    },
                    {
                        "name": "Archive",
                        "reference": "archive",
                        "will_block": false
                    }
                ]
            },
            {
                "name": "Response Processor",
                "reference": "response",
                "will_block": false
            }
        ]
    },
    "description": "Pre-production response processor chain"
}
export const requsetJson={
    "nodes": [
      {
        "id": "1",
        "type": "textUpdater",
        "data": {
          "label": "Application "
        },
        "position": {
          "x": 0,
          "y": 0
        }
      },
      {
        "id": "2",
        "type": "textUpdater",
        "data": {
          "label": "Logging "
        },
        "position": {
          "x": 104,
          "y": 42
        }
      },
      {
        "id": "3",
        "type": "textUpdater",
        "data": {
          "label": "Cost Guardrail"
        },
        "position": {
          "x": 178,
          "y": 78
        }
      },
      {
        "id": "4",
        "type": "textUpdater",
        "data": {
          "label": "Enforce RateLimit"
        },
        "position": {
          "x": 295,
          "y": 115
        }
      },
      {
        "id": "5",
        "type": "textUpdater",
        "data": {
          "label": "Sensitive Data Protection"
        },
        "position": {
          "x": 428,
          "y": 155
        }
      },
      {
        "id": "6",
        "type": "textUpdater",
        "data": {
          "label": "Prompt Injection"
        },
        "position": {
          "x": 606,
          "y": 197
        }
      },
      {
        "id": "7",
        "type": "textUpdater",
        "data": {
          "label": "Archive Calls"
        },
        "position": {
          "x": 731,
          "y": 238.4833129882812
        }
      },
      {
        "id": "8",
        "type": "textUpdater",
        "data": {
          "label": "LLM Endpoint"
        },
        "position": {
          "x": 838,
          "y": 284.97080383300784
        }
      }
    ],
    "edges": [
      {
        "id": "e1-2",
        "source": "1",
        "target": "2"
      },
      {
        "id": "e1-3",
        "source": "2",
        "target": "3"
      },
      {
        "id": "e1-4",
        "source": "3",
        "target": "4"
      },
      {
        "id": "e1-5",
        "source": "4",
        "target": "5"
      },
      {
        "id": "e1-6",
        "source": "5",
        "target": "6"
      },
      {
        "id": "e1-7",
        "source": "6",
        "target": "7"
      },
      {
        "id": "e1-8",
        "source": "7",
        "target": "8"
      },
      {
        "id": "e1-8",
        "source": "8",
        "target": "9"
      }
    ]
}
export const responcseJson={
    "nodes": [
        {
            "id": "1",
            "type": "textUpdater",
            "data": {
                "label": "LLM Endpoint "
            },
            "position": {
                "x": 0,
                "y": 0
            }
        },
        {
            "id": "2",
            "type": "textUpdater",
            "data": {
                "label": "Logging "
            },
            "position": {
                "x": 127,
                "y": 46
            }
        },
        {
            "id": "3",
            "type": "textUpdater",
            "data": {
                "label": "Cost Calculation"
            },
            "position": {
                "x": 218,
                "y": 92
            }
        },
        {
            "id": "4",
            "type": "textUpdater",
            "data": {
                "label": "Content Moderation"
            },
            "position": {
                "x": 354,
                "y": 145
            }
        },
        {
            "id": "5",
            "type": "textUpdater",
            "data": {
                "label": "Archive Calls"
            },
            "position": {
                "x": 510,
                "y": 193
            }
        },
        {
            "id": "6",
            "type": "textUpdater",
            "data": {
                "label": "Application"
            },
            "position": {
                "x": 632,
                "y": 240
            }
        }
    ],
    "edges": [
        {
            "id": "e1-2",
            "source": "1",
            "target": "2"
        },
        {
            "id": "e1-3",
            "source": "2",
            "target": "3"
        },
        {
            "id": "e1-4",
            "source": "3",
            "target": "4"
        },
        {
            "id": "e1-5",
            "source": "4",
            "target": "5"
        },
        {
            "id": "e1-6",
            "source": "5",
            "target": "6"
        },
        {
            "id": "e1-7",
            "source": "6",
            "target": "7"
        }
    ]
}
