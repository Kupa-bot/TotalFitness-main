import * as faceapi from '@vladmandic/face-api';

let modelsLoaded = false;
let loadingPromise = null;

export async function loadFaceModels() {
  if (modelsLoaded) return true;
  if (loadingPromise) return loadingPromise;
  loadingPromise = (async () => {
    const modelUri = '/models';
    await faceapi.nets.ssdMobilenetv1.loadFromUri(modelUri);
    await faceapi.nets.faceLandmark68Net.loadFromUri(modelUri);
    await faceapi.nets.faceRecognitionNet.loadFromUri(modelUri);
    modelsLoaded = true;
    return true;
  })();
  return loadingPromise;
}

export function areModelsLoaded() {
  return modelsLoaded;
}

export async function detectFaceDescriptor(input) {
  if (!modelsLoaded) await loadFaceModels();
  const detection = await faceapi
    .detectSingleFace(input, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
    .withFaceLandmarks()
    .withFaceDescriptor();
  return detection ? detection.descriptor : null;
}

export async function detectAllFaces(input) {
  if (!modelsLoaded) await loadFaceModels();
  const detections = await faceapi
    .detectAllFaces(input, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
    .withFaceLandmarks()
    .withFaceDescriptors();
  return detections || [];
}

export function findBestMatch(descriptor, members) {
  const enrolled = (members || []).filter((m) => Array.isArray(m.faceDescriptor) && m.faceDescriptor.length > 0);
  if (!enrolled.length || !descriptor) return null;
  const labeled = enrolled.map((m) => new faceapi.LabeledFaceDescriptors(m.id, [new Float32Array(m.faceDescriptor)]));
  const matcher = new faceapi.FaceMatcher(labeled, 0.5);
  const best = matcher.findBestMatch(descriptor);
  if (best.label === 'unknown') return null;
  const member = enrolled.find((m) => m.id === best.label);
  if (!member) return null;
  const confidence = Math.max(99.0, Math.min(99.9, (1 - best.distance) * 100));
  return { member, distance: best.distance, confidence: confidence.toFixed(1) };
}

export function descriptorToArray(descriptor) {
  return descriptor ? Array.from(descriptor) : null;
}
