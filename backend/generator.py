from model_loader import pipe

def generate_sketch(description):

    prompt = f"""
    forensic police sketch,
    black and white pencil drawing,
    suspect portrait,
    {description}
    """

    image = pipe(
    prompt,
    num_inference_steps=4,
    guidance_scale=5.5,
    height=384,
    width=384
    ).images[0]

    return image