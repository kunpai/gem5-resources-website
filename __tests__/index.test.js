import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/pages/index.js';
import { useRouter } from 'next/router';


jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

/* const unmockedFetch = global.fetch

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([

      ]),
    })
})

afterAll(() => {
  global.fetch = unmockedFetch
}) */
// https://raw.githubusercontent.com/Gem5Vision/json-to-mongodb/main/schema/test.json


// Mock the fetch function
const mockResponse = {
  "$schema": "http://json-schema.org/draft-07/schema",
  "title": "gem5 Vision Database Schema",
  "description": "A schema that indicates how gem5-resources data is stored, and is also used to validate the data being entered into the database.",
  "type": "object",
  "properties": {
    "category": {
      "type": "string",
      "enum": [
        "workload",
        "diskimage",
        "binary",
        "kernel",
        "benchmark",
        "checkpoint",
        "git",
        "bootloader",
        "file",
        "directory",
        "simpoint",
        "simpoint-directory",
        "resource",
        "looppoint-pinpoint-csv",
        "looppoint-json"
      ],
      "description": "The category of the resource",
      "default": "resource"
    },
    "author": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The author(s) of the resource",
      "default": []
    },
    "code_examples": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "example": {
            "type": "string"
          },
          "tested": {
            "type": "boolean"
          }
        }
      },
      "description": "Code examples for the resource",
      "default": []
    },
    "description": {
      "type": "string",
      "description": "A description of the resource",
      "default": ""
    },
    "source_url": {
      "type": "string",
      "description": "The URL of the source code for the resource",
      "default": ""
    },
    "id": {
      "type": "string",
      "description": "The unique identifier for the resource",
      "default": ""
    },
    "license": {
      "type": "string",
      "description": "The license for the resource",
      "default": ""
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Tags for the resource",
      "default": []
    },
    "usage": {
      "type": "string",
      "description": "Usage instructions for the resource",
      "default": ""
    },
    "versions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "size": {
            "type": "integer",
            "description": "The size of the resource in bytes",
            "default": 0
          },
          "url": {
            "type": "string",
            "description": "The URL of the resource",
            "default": ""
          },
          "version": {
            "type": "string",
            "description": "The version of the resource",
            "default": ""
          },
          "is_tar_archive": {
            "type": [
              "boolean",
              "null"
            ],
            "description": "Whether the resource is a tar archive",
            "default": null
          },
          "md5sum": {
            "type": "string",
            "description": "The MD5 sum of the resource",
            "default": ""
          },
          "is_zipped": {
            "type": [
              "boolean",
              "null"
            ],
            "description": "Whether the resource is zipped",
            "default": null
          }
        }
      },
      "description": "The versions of the resource",
      "default": [
        {
          "size": 0,
          "url": "",
          "version": "",
          "is_tar_archive": null,
          "md5sum": "",
          "is_zipped": null
        }
      ],
      "minItems": 1
    }
  },
  "required": [
    "author",
    "category",
    "description",
    "id",
    "license",
    "source_url",
    "tags",
    "usage",
    "versions"
  ],
  "oneOf": [
    {
      "$ref": "#/definitions/benchmark"
    },
    {
      "$ref": "#/definitions/diskimage"
    },
    {
      "$ref": "#/definitions/binary"
    },
    {
      "$ref": "#/definitions/kernel"
    },
    {
      "$ref": "#/definitions/checkpoint"
    },
    {
      "$ref": "#/definitions/git"
    },
    {
      "$ref": "#/definitions/bootloader"
    },
    {
      "$ref": "#/definitions/file"
    },
    {
      "$ref": "#/definitions/directory"
    },
    {
      "$ref": "#/definitions/simpoint"
    },
    {
      "$ref": "#/definitions/simpoint-directory"
    },
    {
      "$ref": "#/definitions/resource"
    },
    {
      "$ref": "#/definitions/looppoint-pinpoint-csv"
    },
    {
      "$ref": "#/definitions/looppoint-json"
    },
    {
      "$ref": "#/definitions/workload"
    }
  ],
  "definitions": {
    "architecture": {
      "type": [
        "string",
        "null"
      ],
      "enum": [
        "ARM",
        "MIPS",
        "POWER",
        "RISCV",
        "X86",
        "SPARC"
      ],
      "description": "The architecture of the bootloader",
      "default": ""
    },
    "abstract-file": {
      "properties": {
        "category": {
          "type": "string",
          "default": "file"
        },
        "source": {
          "type": "string",
          "description": "The source of the file",
          "default": ""
        },
        "documentation": {
          "type": "string",
          "description": "The documentation describing the file",
          "default": ""
        }
      }
    },
    "abstract-workload": {
      "properties": {
        "function": {
          "type": "string",
          "description": "The function of the workload",
          "default": ""
        },
        "additional_params": {
          "type": "object",
          "description": "The parameters of the workload",
          "default": {}
        },
        "resources": {
          "type": "object",
          "description": "A dictionary of resources that are required to run the workload",
          "default": {}
        }
      },
      "required": [
        "function",
        "additional_params",
        "resources"
      ]
    },
    "abstract-binary": {
      "properties": {
        "arguments": {
          "type": "object",
          "description": "The arguments for the binary",
          "default": {}
        },
        "architecture": {
          "$ref": "#/definitions/architecture"
        }
      },
      "allOf": [
        {
          "$ref": "#/definitions/abstract-file"
        }
      ],
      "required": [
        "architecture"
      ]
    },
    "abstract-directory": {},
    "abstract-simpoint": {
      "properties": {
        "simpoint_interval": {
          "type": "integer",
          "description": "The interval between simpoints",
          "default": 0
        },
        "simpoint_list": {
          "type": "array",
          "items": {
            "type": "integer"
          },
          "description": "The list of simpoints",
          "default": []
        },
        "weight_list": {
          "type": "array",
          "items": {
            "type": "integer"
          },
          "description": "The list of weights",
          "default": []
        },
        "warmup_interval": {
          "type": "integer",
          "description": "The warmup interval",
          "default": 0
        },
        "workload_name": {
          "type": "string",
          "description": "The name of the workload",
          "default": ""
        }
      },
      "required": [
        "simpoint_interval",
        "simpoint_list",
        "weight_list",
        "warmup_interval"
      ]
    },
    "file": {
      "description": "A resource consisting of a single file.",
      "properties": {
        "category": {
          "type": "string",
          "const": "file"
        }
      },
      "allOf": [
        {
          "$ref": "#/definitions/abstract-file"
        }
      ]
    },
    "benchmark": {
      "type": "object",
      "description": "A program that is used to test the performance of a computer system.",
      "properties": {
        "category": {
          "type": "string",
          "const": "benchmark"
        }
      }
    },
    "workload": {
      "description": "Bundles of resources and any input parameters.",
      "properties": {
        "category": {
          "type": "string",
          "const": "workload"
        },
        "resource_directory": {
          "type": "string",
          "description": "An optional parameter that specifies where any resources should be download and accessed from",
          "default": ""
        }
      },
      "allOf": [
        {
          "$ref": "#/definitions/abstract-workload"
        }
      ]
    },
    "diskimage": {
      "description": "A file that contains an exact copy of the data stored on a storage device.",
      "properties": {
        "category": {
          "type": "string",
          "const": "diskimage"
        },
        "root_partition": {
          "type": "string",
          "description": "The root partition of the disk image",
          "default": ""
        }
      },
      "allOf": [
        {
          "$ref": "#/definitions/abstract-file"
        }
      ]
    },
    "binary": {
      "description": "A program that is used to test the performance of a computer system.",
      "properties": {
        "category": {
          "type": "string",
          "const": "binary"
        }
      },
      "allOf": [
        {
          "$ref": "#/definitions/abstract-file"
        },
        {
          "$ref": "#/definitions/abstract-binary"
        }
      ]
    },
    "kernel": {
      "description": "A computer program that acts as the core of an operating system by managing system resources.",
      "properties": {
        "category": {
          "type": "string",
          "const": "kernel"
        },
        "architecture": {
          "$ref": "#/definitions/architecture"
        }
      },
      "required": [
        "architecture"
      ],
      "allOf": [
        {
          "$ref": "#/definitions/abstract-binary"
        }
      ]
    },
    "checkpoint": {
      "description": "A snapshot of a simulation.",
      "properties": {
        "category": {
          "type": "string",
          "const": "checkpoint"
        }
      },
      "allOf": [
        {
          "$ref": "#/definitions/abstract-directory"
        }
      ]
    },
    "git": {
      "description": "A git resource.",
      "properties": {
        "category": {
          "type": "string",
          "const": "git"
        }
      },
      "allOf": [
        {
          "$ref": "#/definitions/abstract-directory"
        }
      ]
    },
    "bootloader": {
      "description": "A small program that is responsible for loading the operating system into memory when a computer starts up.",
      "properties": {
        "category": {
          "type": "string",
          "const": "bootloader"
        },
        "architecture": {
          "$ref": "#/definitions/architecture"
        }
      },
      "required": [
        "architecture"
      ],
      "allOf": [
        {
          "$ref": "#/definitions/abstract-binary"
        }
      ]
    },
    "directory": {
      "description": "A resource consisting of a directory.",
      "properties": {
        "category": {
          "type": "string",
          "const": "directory"
        }
      },
      "allOf": [
        {
          "$ref": "#/definitions/abstract-directory"
        }
      ]
    },
    "simpoint": {
      "description": "This resource stores all information required to perform a Simpoint creation and restore.",
      "properties": {
        "category": {
          "type": "string",
          "const": "simpoint"
        }
      },
      "allOf": [
        {
          "$ref": "#/definitions/abstract-simpoint"
        }
      ]
    },
    "simpoint-directory": {
      "description": "This Simpoint Resource assumes the existance of a directory containing a simpoint file and a weight file.",
      "properties": {
        "category": {
          "type": "string",
          "const": "simpoint-directory"
        }
      },
      "allOf": [
        {
          "$ref": "#/definitions/abstract-simpoint"
        }
      ]
    },
    "resource": {
      "description": "A generic Resource.",
      "properties": {
        "category": {
          "type": "string",
          "const": "resource"
        }
      }
    },
    "looppoint-pinpoint-csv": {
      "description": "This Looppoint resource used to create a Looppoint resource from a pinpoints CSV file.",
      "properties": {
        "category": {
          "type": "string",
          "const": "looppoint-pinpoint-csv"
        }
      },
      "allOf": [
        {
          "$ref": "#/definitions/abstract-file"
        }
      ]
    },
    "looppoint-json": {
      "description": "This Looppoint resource used to create a Looppoint resource from a Looppoint json file.",
      "properties": {
        "category": {
          "type": "string",
          "const": "looppoint-json"
        },
        "region_id": {
          "type": "integer",
          "description": "The region id of the looppoint",
          "default": 0
        }
      },
      "allOf": [
        {
          "$ref": "#/definitions/abstract-file"
        }
      ]
    }
  }
}
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockResponse),
  })
);

describe('Home component', () => {
  test('renders the logo', async () => {
    render(<Home />);
    const logo = screen.getByRole('img', { name: /gem5 logo/i })
    expect(logo).toBeInTheDocument();
  });

  /* test('renders the getting started section', () => {
    render(<Home />);
    const gettingStartedTitle = screen.getByText('Getting Started');
    expect(gettingStartedTitle).toBeInTheDocument();
    const cardsContainer = screen.getByRole('div', { name: /cards container/i });
    const gettingStartedCards = screen.getAllByRole('article', { name: /getting started card/i });
    console.log(gettingStartedCards);
    expect(gettingStartedCards).toHaveLength(3);
  }); */

  test('Checks for 3 cards in the getting started section', () => {
    render(<Home />);
    const cardsContainer = screen.container.querySelector('#__next > main > div > div:nth-child(5) > div')
    console.log(cardsContainer);
    // const cardsContainer = document.querySelector('.cardsContainer');
    // console.log(cardsContainer);
    // expect(cardsContainer.children).toHaveLength(3);
  });

  /* test('renders the getting started section', () => {
    render(<Home />);
    const gettingStartedTitle = screen.getByText('Getting Started');
    expect(gettingStartedTitle).toBeInTheDocument();
    const cardsContainer = document.querySelector('.cardsContainer');
    console.log(cardsContainer);
  }); */
  /* test('renders the categories section', () => {
    render(<Home />);
    const categoriesTitle = screen.getByText('Categories');
    expect(categoriesTitle).toBeInTheDocument();
    const categoryCards = screen.getAllByTestId('category-card');
    expect(categoryCards).toHaveLength(3);
  });

  test('navigates to the resources page when searching', () => {
    const router = {
      push: jest.fn()
    };
    const { getByPlaceholderText } = render(<Home router={router} />);
    const searchInput = getByPlaceholderText('Search for resources');
    const searchQuery = 'gem5';
    fireEvent.change(searchInput, { target: { value: searchQuery } });
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 13, charCode: 13 });
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/resources',
      query: { q: searchQuery }
    });
  }); */
});
