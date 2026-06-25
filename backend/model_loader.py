import torch
from diffusers import (
    StableDiffusionPipeline,
    DPMSolverMultistepScheduler
)

MODEL_ID = "runwayml/stable-diffusion-v1-5"

device = "cuda" if torch.cuda.is_available() else "cpu"

dtype = torch.float16 if device == "cuda" else torch.float32

print("Loading model...")
print("Device:", device)

pipe = StableDiffusionPipeline.from_pretrained(
    MODEL_ID,
    torch_dtype=dtype,
    safety_checker=None
)

pipe.scheduler = DPMSolverMultistepScheduler.from_config(
    pipe.scheduler.config
)

pipe = pipe.to(device)

print("Model loaded successfully")